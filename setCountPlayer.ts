import { Markup } from "telegraf";
import { button } from "telegraf/typings/markup";
export const setCountPlayer = (bot:any)=>{
    bot.hears("Количество игроков",async (ctx:any)=>{
        
        await ctx.reply('Выберите количество игроков',Markup.inlineKeyboard([
            [Markup.button.callback("4 игроков","setCountPlayer_4"),Markup.button.callback('5 игроков',"setCountPlayer_5")],
            [Markup.button.callback("6 игроков","setCountPlayer_6"),Markup.button.callback('7 игроков',"setCountPlayer_7")],
            [Markup.button.callback("8 игроков","setCountPlayer_8"),Markup.button.callback('9 игроков',"setCountPlayer_9")]
        ]))
        
        
        
        // ctx.telegram.editMessageReplyMarkup(ctx.chat.id, ctx.message.message_id, null, { reply_markup:{
        //     inline_keyboard:[[{text:'new button', callback_data:'callback_data'}]]
        // }});
        
    })
    async function setBlackPlayer(ctx:any,countPlayer:number){
        ctx.answerCbQuery();
        function calculateMafiaPlayer(countPlayer:number): object{
            let arr:object = [];
            switch (countPlayer){
                case 4:{
                    arr = [Markup.button.callback("1 мафия","setCountMafia_1")];
                    break;
                }
                case 5:{
                    arr = [Markup.button.callback("1 мафия","setCountMafia_1"),Markup.button.callback('2 мафии',"setCountMafia_2")];
                    break;
                }
            }
            return arr;
        }
        await ctx.editMessageText("Выбрано " + countPlayer + " игроков.");
        
        await setTimeout(() => {
            
            ctx.editMessageText("Выберите количество мафии:");
            if(calculateMafiaPlayer(countPlayer)){
                ctx.editMessageReplyMarkup({
                    inline_keyboard: [[Markup.button.callback("1 мафия","setCountMafia_1")]]
                })
            }
            
        }, 2500);
        
        
    }
    bot.action('setCountPlayer_4', (ctx: any) => {
        setBlackPlayer(ctx,4);
    })
    bot.action('setCountPlayer_5', (ctx: any) => {
        setBlackPlayer(ctx,5);
    })
    bot.action('setCountPlayer_6', (ctx: any) => {
        setBlackPlayer(ctx,6);
    })
    bot.action('setCountPlayer_7', (ctx: any) => {
        setBlackPlayer(ctx,7);
    })
    bot.action('setCountPlayer_8', (ctx: any) => {
        setBlackPlayer(ctx,8);
    })
    bot.action('setCountPlayer_9', (ctx: any) => {
        setBlackPlayer(ctx,9);
    })
    
}



