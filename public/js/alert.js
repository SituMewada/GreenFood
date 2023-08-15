const alert=document.getElementsByTagName('body');

export const alertBox=(message,name)=>{
    alert.prepend(`<div class="alert alert--${name}">${message}</div>`);
};

 
