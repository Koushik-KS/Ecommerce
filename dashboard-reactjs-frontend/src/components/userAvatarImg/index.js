
const UserAvatarImgComponent = (props)=>{
    return(
      <div className="userImg">
                  <span className="rounded-circle">
                    <img src={props.img} alt="user" />
                  </span>
                </div>
    )
}
export default UserAvatarImgComponent;