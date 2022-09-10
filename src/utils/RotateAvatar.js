export const RotateAvatar = (id) => {
    if (document.getElementById(id)) {
      let avatar = document.getElementById(id)
      setTimeout(() => {
        avatar.style.animation = ('myfirst2 1s  ease')
      }, 1)
      avatar.style.animation = ('none')
    }
  }