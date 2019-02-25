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
                url: 'http://localhost:3001/Products',
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
                        var imageLocation="http://localhost:3001/public/assets/images/"+product.itemImage;
                        appendedProducts=appendedProducts+"<img src=\""+imageLocation+"\" > <div class=contents>";
                        var productInfo="<p>This is a basic pug file</p> <p>Name Of Product:"+  product.itemName+"</p> <p>Name Of Seller: "+product.sellerName+"</p> <p>Email of Seller: "+product.sellerEmail+"</p> <p> Product Description: "+product.itemDescription+"</p> <p>Item Quantity: "+product.itemQuantity+"</p>";
                        appendedProducts=appendedProducts+productInfo+"</div> </div>";
                        //console.log(appendedProducts);
                        wrap.innerHTML+=appendedProducts;
    
                    });
                }
            })
            .fail(function() {alert("error");});

        }
    }
    $("button").click(function()
    {
        console.log('The product name is '+this.id );
    });
    window.onscroll=yscroll;
});