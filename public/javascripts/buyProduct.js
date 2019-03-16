$(document).ready(()=>
{
    $("button").click(function()
    {
        console.log(this.id);
        var productToBuy=JSON.stringify({itemBought:this.id});
        console.log(productToBuy);
        $.ajax({
            dataType: 'json',
            type: "POST",
            url: "http://localhost:3000/BuyAProduct",
            data: productToBuy,
            contentType: 'application/json',
            success: ()=>{console.log('done adding')},
        });
    });
});