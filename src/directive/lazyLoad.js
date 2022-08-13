const lazyLoad = {
  bind(el,binding){
    const io = new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting){
        el.src = binding.value
      }
      // else{
      //   const img = require("@/assets/loading.gif")
      //   el.src = img
      // }

    })
    io.observe(el)
  }
}

export default lazyLoad