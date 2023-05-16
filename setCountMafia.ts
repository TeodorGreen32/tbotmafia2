import { Markup } from "telegraf";
import { button } from "telegraf/typings/markup";
import { setPutanaPlayer } from "./setPutanaPlayer";

async function sendCountMafiaToServer(countMafia:number,ctx:any,bot:any){
    await ctx.answerCbQuery();
    await fetch(`https://greenz.site/setCountPlayer.php?nameUser=${ctx.from.username}&countMafia=${countMafia}`).then(response => (response.text())).then(async(data) => {
        await console.log("sendMafia")
        let countPlayer = await JSON.parse(data).countPlayer;
        // await ctx.editMessageText(`Мирные жители: ${countPlayer-countMafia} Мафия: ${countMafia}`);
        setPutanaPlayer(bot,ctx,countPlayer);
    })
    
    
    
    
}
function setAction(bot:any){
    bot.action("setCountMafia_1",(ctx:any)=>{
        
        sendCountMafiaToServer(1,ctx,bot);
        
        
    })
    bot.action("setCountMafia_2",(ctx:any)=>{
        
        sendCountMafiaToServer(2,ctx,bot);
        
    })
    bot.action("setCountMafia_3",(ctx:any)=>{
        
        sendCountMafiaToServer(3,ctx,bot);
        
    })
    bot.action("setCountMafia_4",(ctx:any)=>{
        
        sendCountMafiaToServer(4,ctx,bot);
        
    })
}
export async function setBlackPlayer(ctx:any,countPlayer:number,bot:any){
    async function getMafiaKeyBoard(countPlayer:number){
        function calculateMafiaPlayer(countPlayer:number): object{
            let arr:object = [];
            switch (countPlayer){
                case 4:{
                    arr = [[Markup.button.callback("1 мафия","setCountMafia_1")]];
                    break;
                }
                case 5:{
                    arr = [[Markup.button.callback("1 мафия","setCountMafia_1"),Markup.button.callback('2 мафии',"setCountMafia_2")]];
                    break;
                }
                case 6:{
                    arr = [[Markup.button.callback("1 мафия","setCountMafia_1"),Markup.button.callback('2 мафии',"setCountMafia_2")]];
                    break;
                }
                case 7:{
                    arr = [[Markup.button.callback("1 мафия","setCountMafia_1"),Markup.button.callback('2 мафии',"setCountMafia_2")],
                          [Markup.button.callback("3 мафия","setCountMafia_3")]
                        ];
                    break;
                }
                case 8:{
                    arr = [[Markup.button.callback("1 мафия","setCountMafia_1"),Markup.button.callback('2 мафии',"setCountMafia_2")],
                          [Markup.button.callback("3 мафия","setCountMafia_3")]
                        ];
                    break;
                }
                case 9:{
                    arr = [[Markup.button.callback("1 мафия","setCountMafia_1"),Markup.button.callback('2 мафии',"setCountMafia_2")],
                          [Markup.button.callback("3 мафия","setCountMafia_3"),Markup.button.callback('4 мафии',"setCountMafia_4")]
                        ];
                    break;
                }
                default:{
                    arr = [Markup.button.callback("1 мафия","setCountMafia_1")];
                    break
                }
            }
            return arr;
        }
        await ctx.editMessageText("Выбрано " + countPlayer + " игроков.");
        
        await setTimeout(async () => {
            
            await ctx.editMessageText("Выберите количество мафии:");
            if(calculateMafiaPlayer(countPlayer)){
                await ctx.editMessageReplyMarkup({
                    inline_keyboard: calculateMafiaPlayer(countPlayer)
                })
            }
            
        }, 800);
        setAction(bot)
    }
    getMafiaKeyBoard(countPlayer);

    
    
    
}
