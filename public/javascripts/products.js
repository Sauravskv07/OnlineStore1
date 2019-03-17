$(document).ready(()=>
{
    function yscroll()
    {
        var wrap=document.getElementById('container');
        var contentHeight=wrap.offsetHeight;
        var yOffset=window.pageYOffset+window.innerHeight;
        if(yOffset>=contentHeight)
        {
            console.log('reached here');
            $.ajax({
                url: 'http://localhost:3000/loadMoreProducts',
                type: 'GET',
                processData: false,
             })
            .done(function(data) 
            {
                {
                    var appendedProducts="";
                    data.forEach((product)=>
                    {
                        appendedProducts=appendedProducts+"<div class=box>"
                        var imageLocation="http://localhost:3000/public/assets/images/"+product.itemImage;
                        appendedProducts=appendedProducts+"<img src=\""+imageLocation+"\" > <div class=contents>";
                        var productInfo=product.itemName
                        appendedProducts=appendedProducts+productInfo+"</div> </div>";
                        //console.log(appendedProducts);
                        wrap.innerHTML+=appendedProducts;
    
                    });
                }
            })
            .fail(function() {alert("error");});

        }
    }
    window.onscroll=yscroll;
});