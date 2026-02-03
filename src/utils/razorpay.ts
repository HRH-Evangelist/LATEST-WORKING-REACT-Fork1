// Razorpay payment utility
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number; // in paise (1 INR = 100 paise)
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    [key: string]: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface ProductDetails {
  name: string;
  variant: string;
  price: number; // in INR
  quantity: number;
  customization?: {
    engraving: boolean;
    engravingCost: number;
  };
}

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if already loaded (now loaded from HTML)
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    // Wait a bit for script to load from HTML
    setTimeout(() => {
      resolve(!!window.Razorpay);
    }, 100);
  });
};

// Initialize Razorpay payment
export const initiatePayment = async (
  productDetails: ProductDetails,
  userDetails?: {
    name?: string;
    email?: string;
    contact?: string;
  }
): Promise<void> => {
  const res = await loadRazorpayScript();

  if (!res) {
    alert("Razorpay SDK failed to load. Please check your connection.");
    return;
  }

  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

  // Debug log to check if env variable is loaded
  console.log("Environment check:", {
    keyId,
    allEnvVars: import.meta.env,
  });

  if (!keyId) {
    console.error("Razorpay Key ID not found in environment variables");
    console.error("Available env vars:", Object.keys(import.meta.env));
    alert("Payment system configuration error. Please contact support.");
    return;
  }

  // Calculate total amount
  let totalAmount = productDetails.price * productDetails.quantity;
  if (productDetails.customization?.engraving) {
    totalAmount +=
      productDetails.customization.engravingCost * productDetails.quantity;
  }

  // Validate amount
  if (totalAmount <= 0) {
    alert("Invalid amount. Please try again.");
    return;
  }

  console.log("Initiating payment with:", {
    keyId,
    amount: totalAmount * 100,
    totalAmount,
    productDetails,
  });

  const options: RazorpayOptions = {
    key: keyId,
    amount: totalAmount * 100, // Convert to paise
    currency: "INR",
    name: "1 Sec Story",
    description: `${productDetails.name} - ${productDetails.variant}`,
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (response: RazorpayResponse) {
      // Payment successful
      console.log("Payment successful:", response);
      alert(
        `✅ Payment Successful!\n\nPayment ID: ${response.razorpay_payment_id}\n\nYour order will be processed shortly.`
      );
      
      // Send payment details to backend
      handlePaymentSuccess(response, productDetails);
    },
    prefill: {
      name: userDetails?.name || "Customer",
      email: userDetails?.email || "customer@example.com",
      contact: userDetails?.contact || "9999999999",
    },
    notes: {
      product: productDetails.name,
      variant: productDetails.variant,
      quantity: productDetails.quantity.toString(),
      engraving: productDetails.customization?.engraving ? "Yes" : "No",
    },
    theme: {
      color: "#9333EA",
    },
    modal: {
      ondismiss: function () {
        console.log("Payment cancelled by user");
      },
    },
  };

  try {
    const paymentObject = new window.Razorpay(options);
    
    // Add payment failed event handler
    paymentObject.on('payment.failed', function (response: any) {
      console.error("Payment failed:", response.error);
      
      // Check if it's a 406 error (account not activated)
      if (response.error.description?.includes('406') || 
          response.error.reason === 'payment_failed' ||
          response.error.code === 'BAD_REQUEST_ERROR') {
        alert(
          `🔧 Payment System Temporarily Unavailable\n\n` +
          `We're currently setting up our payment gateway.\n\n` +
          `Please contact us directly to place your order:\n` +
          `📧 Email: support@1secstory.com\n` +
          `📱 Phone: +91 99621 79369\n\n` +
          `Thank you for your patience!`
        );
      } else {
        alert(
          `❌ Payment Failed\n\n` +
          `Reason: ${response.error.description}\n\n` +
          `Please try again or contact support at:\n` +
          `📧 support@1secstory.com`
        );
      }
    });
    
    paymentObject.open();
  } catch (error) {
    console.error("Error opening Razorpay:", error);
    alert("Failed to open payment window. Please try again.");
  }
};

// Handle successful payment
const handlePaymentSuccess = (
  response: RazorpayResponse,
  productDetails: ProductDetails
) => {
  // Send payment details to your backend
  // You can implement this based on your backend setup
  
  const paymentData = {
    payment_id: response.razorpay_payment_id,
    order_id: response.razorpay_order_id,
    signature: response.razorpay_signature,
    product: productDetails,
    timestamp: new Date().toISOString(),
  };

  console.log("Payment data to send to backend:", paymentData);

  // TODO: Implement backend API call
  // fetch('/api/payment/verify', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(paymentData)
  // });
};

// Helper function to format price
export const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString("en-IN")}`;
};
