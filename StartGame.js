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
exports.StartGame = void 0;
const telegraf_1 = require("telegraf");
const { Telegraf } = require('telegraf');
let i = 0;
function getSecretCard(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ctx.replyWithHTML("secretCard");
        yield ctx.deleteMessage();
        yield ctx.replyWithPhoto({ source: "./assets/img/secretCard.png" }, telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback("Посмотреть роль", "CheckRole")
        ]));
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
    });
}
function startGame(array, ctx) {
    if (i <= array.length) {
        getSecretCard(ctx);
    }
    // for(i=0;i<array.length;){
    //     getSecretCard(ctx)
    //     console.log(array.length)
    // }
}
function getGameArray(username, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        function getData(url) {
            return __awaiter(this, void 0, void 0, function* () {
                let res = yield fetch(url);
                if (res.ok) {
                    return yield res.text();
                }
            });
        }
        getData(`https://greenz.site/getGameArray.php?nameUser=${username}`).then((data) => {
            let newData = JSON.parse(data);
            ctx.replyWithHTML("<code>Мирные жители: </code><strong><u>" + (newData.countPlayer - newData.countMafia) + "</u></strong><code>  Мафия: </code><u><b>" + newData.countMafia + "</b></u><code>  Роль путаны: </code><u><b>" + (newData.putanaYes ? "Есть" : "Нет") + "</b></u><code>  Роль маньяка:  </code><strong><u>" + (newData.maniacYes ? "Есть </u></strong>" : "Нет </u></strong>"));
        });
        getData(`https://greenz.site/getGameArray.php?nameUser=${username}&getArray=true`).then((data) => {
            startGame(JSON.parse(data), ctx);
        });
    });
}
const StartGame = (ctx, bot, username = ctx.from.username) => {
    bot.action("CheckRole", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.answerCbQuery();
        yield ctx.editMessageMedia({
            type: 'photo',
            media: { source: "./assets/img/Health2.png" },
            caption: "321"
        });
        yield ctx.editMessageReplyMarkup({
            inline_keyboard: [[
                    telegraf_1.Markup.button.callback("Скрыть карту", "CloseCard")
                ]]
        });
        yield console.log(i);
    }));
    bot.action("CloseCard", () => __awaiter(void 0, void 0, void 0, function* () {
        i = i + 1;
        getSecretCard(ctx);
    }));
    // ctx.deleteMessage();
    getGameArray(username, ctx);
};
exports.StartGame = StartGame;
