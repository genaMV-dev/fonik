import css from "./ProfileLoader.module.css"
import { Loader as RsuiteLoader } from "rsuite"
import "rsuite/dist/rsuite-no-reset.min.css"

const ProfileLoader = () => {
  return (
    <div className={css.background}>
      <div className={css.wrapper}>
        <RsuiteLoader size="lg" speed="fast" />
        <h2 className={css.title}>Loading profile...</h2>
        <p className={css.paragraph}>Please wait while we fetch your profile</p>
      </div>
    </div>
  )
}

export default ProfileLoader
