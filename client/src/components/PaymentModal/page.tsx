import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RTMkMBCkOUZ2CSsO3AAqHb7SKDUSmckDKmnJQIhXZZGu1vMWbpG5AdlDHcyN3WNEQMVt0gqtNTUQDwrV0xRnPew00ZriUekAa"
);

interface EventData {
  id: string | number;
  title: string;
  price: number;
  venue: string;
  date: string;
}

interface PaymentModalProps {
  eventData?: EventData;
  onClose?: () => void;
}

function StripePaymentForm({
  count,
  setCount,
  eventData,
  onClose,
}: {
  count: number;
  setCount: (count: number) => void;
  eventData?: EventData;
  onClose?: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe is not loaded yet. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const ticketPrice = eventData?.price || 1300;
      const totalAmount = count * ticketPrice;

      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      if (!res.ok) {
        throw new Error(`Failed to create payment intent: ${res.status}`);
      }

      const { clientSecret } = await res.json();

      if (!clientSecret) {
        throw new Error("No client secret received");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement)!,
            billing_details: {
              name: "Test User",
            },
          },
        }
      );

      setLoading(false);

      if (error) {
        alert(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        alert("Payment successful!");
        router.push("/success");
      } else {
        alert("Payment was not completed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        alert(`Payment failed: ${error.message}`);
      } else {
        alert("Payment failed. Please check your connection and try again.");
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#fff",
        fontSize: "14px",
        fontFamily: "'Microsoft', sans-serif",
        "::placeholder": {
          color: "#999",
        },
      },
      invalid: {
        color: "#ff0000",
      },
    },
  };

  return (
    <>
      {/* Close button */}
      <button
        className={styles.closeButton}
        aria-label="Close"
        onClick={onClose || (() => router.push("/"))}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path
            d="M8 8L24 24M8 24L24 8"
            stroke="#E6E6E6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Title */}
      <h2 className={styles.title}>
        {eventData ? `Buy Ticket - ${eventData.title}` : "Payment method"}
      </h2>

      {/* Event Info Display */}
      {eventData && (
        <div className={styles.eventInfo}>
          <p>
            <strong>Event:</strong> {eventData.title}
          </p>
          <p>
            <strong>Date:</strong> {eventData.date}
          </p>
          <p>
            <strong>Venue:</strong> {eventData.venue}
          </p>
          <p>
            <strong>Price:</strong> {eventData.price} ISK per ticket
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handlePay}>
        {/* Name Input */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Full name</label>
          <input className={styles.input} placeholder="" />
        </div>

        {/* Email Input */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address</label>
          <input className={styles.input} placeholder="" />
        </div>

        {/* Card Number */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Card Number</label>
          <div className={styles.input}>
            <CardNumberElement options={cardElementOptions} />
          </div>
        </div>

        {/* CVC and Expiration Date Row */}
        <div className={styles.row}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label className={styles.label}>CVC</label>
            <div className={styles.inputSmall}>
              <CardCvcElement options={cardElementOptions} />
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <label className={styles.label}>Expiration Date</label>
            <div className={styles.inputSmall}>
              <CardExpiryElement options={cardElementOptions} />
            </div>
          </div>
        </div>

        {/* Ticket Counter */}
        <div className={styles.ticketControls}>
          <button
            type="button"
            className={styles.ticketButton}
            onClick={() => setCount(Math.max(1, count - 1))}
            aria-label="Decrease"
          >
            –
          </button>
          <span className={styles.ticketCount}>{count}</span>
          <button
            type="button"
            className={styles.ticketButton}
            onClick={() => setCount(count + 1)}
            aria-label="Increase"
          >
            +
          </button>
          <span className={styles.ticketPrice}>
            {count * (eventData?.price || 1300)} kr
          </span>
        </div>

        {/* Book Button */}
        <button
          className={styles.bookButton}
          type="submit"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Book your ticket"}
        </button>
      </form>

      {/* Or divider */}
      <div className={styles.or}>or</div>

      {/* Alternative Payment Buttons */}
      <button className={styles.payAltButton}>
        <img
          src="/assets/icons/GoogleIcon.svg"
          alt="Google Pay"
          width={40}
          height={19}
          style={{ objectFit: "contain" }}
        />
        Google Pay
      </button>

      <button className={styles.payAltButton}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
          alt="Apple Pay"
        />
        Apple Pay
      </button>
    </>
  );
}

export default function PaymentModal({
  eventData,
  onClose,
}: PaymentModalProps) {
  const [count, setCount] = useState(1);
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push("/");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <Elements stripe={stripePromise}>
          <StripePaymentForm
            count={count}
            setCount={setCount}
            eventData={eventData}
            onClose={handleClose}
          />
        </Elements>
      </div>
    </div>
  );
}
