import css from "./Checkout.module.css"
import { FaCheck } from "react-icons/fa"

interface CheckoutProps {
  onClose: () => void
}

const Checkout = ({ onClose }: CheckoutProps) => {
  return (
    <div className={css.background}>
      <div className={css.wrapper}>
        <FaCheck className={css.icon} size={100} />
        <h2 className={css.title}>Your order has been accepted</h2>
        <p className={css.paragraph}>The owner will contact you soon</p>
        <button className={css.btn} type="button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  )
}

export default Checkout
