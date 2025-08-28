function turnTo(info){
    if(info == "price"){
        window.location.href = pdf_url + '/source/material/CFD_price.pdf?version='+ Math.random()
    }else if(info == "details"){
        window.location.href = pdf_url + '/source/material/CFD_details.pdf?version='+ Math.random()
    }else{
        window.location.href = pdf_url + '/source/material/vip_terms.pdf?version='+ Math.random()      
    }
   
}