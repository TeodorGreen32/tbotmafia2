import { Markup } from "telegraf";
import { button } from "telegraf/typings/markup";
import { cleanChat } from ".";
import { json } from "stream/consumers";
const { Telegraf } = require('telegraf');
let i = 0

async function getSecretCard(ctx:any){
    await ctx.replyWithHTML("secretCard")
    await ctx.deleteMessage();
    await ctx.replyWithPhoto({source: "./assets/img/secretCard.png"},Markup.inlineKeyboard([
        Markup.button.callback("Посмотреть роль","CheckRole")
    ]))
    // await ctx.editMessageMedia({
    //     type: 'photo',
    //     media: {source: "./assets/img/secretCard.png"},
    //     caption: "321"
    // })
    // await ctx.editMessageReplyMarkup({
    //     inline_keyboard: [[
    //         Markup.button.callback("Посмотреть роль","CheckRole")
    //     ]]
    // })
}
function startGame(array:any,ctx:any){
    
    
    if(i <= array.length){
        getSecretCard(ctx)
    }
    
    // for(i=0;i<array.length;){
    //     getSecretCard(ctx)
    //     console.log(array.length)

    // }
}


async function getGameArray(username:string,ctx:any){
    
    async function getData(url:string) {
        let res = await fetch(url);
        if (res.ok) {
            return await res.text();
        }
    }
    
    
    getData(`https://greenz.site/getGameArray.php?nameUser=${username}`).then((data:any) => {
        let newData = JSON.parse(data);
        ctx.replyWithHTML("<code>Мирные жители: </code><strong><u>" + (newData.countPlayer - newData.countMafia) + "</u></strong><code>  Мафия: </code><u><b>" + newData.countMafia + "</b></u><code>  Роль путаны: </code><u><b>" + (newData.putanaYes?"Есть":"Нет") + "</b></u><code>  Роль маньяка:  </code><strong><u>" + (newData.maniacYes?"Есть </u></strong>":"Нет </u></strong>"));
    })
    getData(`https://greenz.site/getGameArray.php?nameUser=${username}&getArray=true`).then((data:any) => {
        startGame(JSON.parse(data),ctx)
    })
    
}

export const StartGame = (ctx:any,bot:any,username:string = ctx.from.username) => {
    bot.action("CheckRole",async (ctx:any)=>{
        await ctx.answerCbQuery();
        await ctx.editMessageMedia({
            type: 'photo',
            media: {source: "./assets/img/Health2.png"},
            caption: "321"
        })
        await ctx.editMessageReplyMarkup({
            inline_keyboard: [[
                Markup.button.callback("Скрыть карту","CloseCard")
            ]]
        })
        
        await console.log(i)
    })
    bot.action("CloseCard",async ()=>{
        i = i+1;
        getSecretCard(ctx);
    })
    // ctx.deleteMessage();
    getGameArray(username,ctx);
}