import css from "./Loader.module.css"
import { Loader as RsuiteLoader } from "rsuite"
import "rsuite/dist/rsuite-no-reset.min.css"; 

const Loader = () => {
  return (
    <div className={css.background}>
      <div className={css.wrapper}>
        <RsuiteLoader size="lg" speed="fast" />
        <h2 className={css.title}>Loading phones...</h2>
        <p className={css.paragraph}>
          Please wait while we fetch the best <br /> phones for you
        </p>
      </div>
    </div>
  )
}

export default Loader