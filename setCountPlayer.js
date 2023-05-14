"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCountPlayer = void 0;
const telegraf_1 = require("telegraf");
const setCountPlayer = (bot) => {
    bot.hears("Количество игроков", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.reply('Выберите количество игроков', telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("4 игроков", "setCountPlayer_4"), telegraf_1.Markup.button.callback('5 игроков', "setCountPlayer_5")],
            [telegraf_1.Markup.button.callback("6 игроков", "setCountPlayer_6"), telegraf_1.Markup.button.callback('7 игроков', "setCountPlayer_7")],
            [telegraf_1.Markup.button.callback("8 игроков", "setCountPlayer_8"), telegraf_1.Markup.button.callback('9 игроков', "setCountPlayer_9")]
        ]));
        // ctx.telegram.editMessageReplyMarkup(ctx.chat.id, ctx.message.message_id, null, { reply_markup:{
        //     inline_keyboard:[[{text:'new button', callback_data:'callback_data'}]]
        // }});
    }));
    function setBlackPlayer(ctx, countPlayer) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.answerCbQuery();
            function calculateMafiaPlayer(countPlayer) {
                let arr = [];
                switch (countPlayer) {
                    case 4: {
                        arr = [telegraf_1.Markup.button.callback("1 мафия", "setCountMafia_1")];
                        break;
                    }
                    case 5: {
                        arr = [telegraf_1.Markup.button.callback("1 мафия", "setCountMafia_1"), telegraf_1.Markup.button.callback('2 мафии', "setCountMafia_2")];
                        break;
                    }
                }
                return arr;
            }
            yield ctx.editMessageText("Выбрано " + countPlayer + " игроков.");
            yield setTimeout(() => {
                ctx.editMessageText("Выберите количество мафии:");
                if (calculateMafiaPlayer(countPlayer)) {
                    ctx.editMessageReplyMarkup({
                        inline_keyboard: [[telegraf_1.Markup.button.callback("1 мафия", "setCountMafia_1")]]
                    });
                }
            }, 2500);
        });
    }
    bot.action('setCountPlayer_4', (ctx) => {
        setBlackPlayer(ctx, 4);
    });
    bot.action('setCountPlayer_5', (ctx) => {
        setBlackPlayer(ctx, 5);
    });
    bot.action('setCountPlayer_6', (ctx) => {
        setBlackPlayer(ctx, 6);
    });
    bot.action('setCountPlayer_7', (ctx) => {
        setBlackPlayer(ctx, 7);
    });
    bot.action('setCountPlayer_8', (ctx) => {
        setBlackPlayer(ctx, 8);
    });
    bot.action('setCountPlayer_9', (ctx) => {
        setBlackPlayer(ctx, 9);
    });
};
exports.setCountPlayer = setCountPlayer;
