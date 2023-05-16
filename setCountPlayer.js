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
const setCountMafia_1 = require("./setCountMafia");
const _1 = require(".");
const setCountPlayer = (bot) => {
    bot.hears("Количество игроков", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, _1.cleanChat)(ctx);
        yield ctx.replyWithHTML("<a href='https://t.me/MafiaNght_bot'>--- @MafiaNght_bot ---</a>", telegraf_1.Markup.removeKeyboard());
        yield ctx.replyWithHTML('<b>Выберите количество игроков </b>', telegraf_1.Markup.inlineKeyboard([
            [telegraf_1.Markup.button.callback("4 игроков", "setCountPlayer_4"), telegraf_1.Markup.button.callback('5 игроков', "setCountPlayer_5")],
            [telegraf_1.Markup.button.callback("6 игроков", "setCountPlayer_6"), telegraf_1.Markup.button.callback('7 игроков', "setCountPlayer_7")],
            [telegraf_1.Markup.button.callback("8 игроков", "setCountPlayer_8"), telegraf_1.Markup.button.callback('9 игроков', "setCountPlayer_9")]
        ]));
    }));
    function setCountPlayer(ctx, countPlayer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`https://greenz.site/setCountPlayer.php?nameUser=${ctx.from.username}&countPlayer=${countPlayer}`).then(response => (response.text())).then(data => {
                console.log("sendPlayer");
            });
            yield ctx.answerCbQuery();
            yield (0, setCountMafia_1.setBlackPlayer)(ctx, countPlayer, bot);
        });
    }
    bot.action('setCountPlayer_4', (ctx) => {
        setCountPlayer(ctx, 4);
    });
    bot.action('setCountPlayer_5', (ctx) => {
        setCountPlayer(ctx, 5);
    });
    bot.action('setCountPlayer_6', (ctx) => {
        setCountPlayer(ctx, 6);
    });
    bot.action('setCountPlayer_7', (ctx) => {
        setCountPlayer(ctx, 7);
    });
    bot.action('setCountPlayer_8', (ctx) => {
        setCountPlayer(ctx, 8);
    });
    bot.action('setCountPlayer_9', (ctx) => {
        setCountPlayer(ctx, 9);
    });
};
exports.setCountPlayer = setCountPlayer;
