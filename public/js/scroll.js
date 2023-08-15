const viewBtn=document.querySelector('.view_item');
const scrollTo=document.querySelector('.section-hero');

//console.log('run');
viewBtn.addEventListener('click',(e)=>{
   //  console.log(e);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
})