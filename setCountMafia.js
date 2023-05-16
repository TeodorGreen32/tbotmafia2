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
exports.setBlackPlayer = void 0;
const telegraf_1 = require("telegraf");
const setPutanaPlayer_1 = require("./setPutanaPlayer");
function sendCountMafiaToServer(countMafia, ctx, bot) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ctx.answerCbQuery();
        yield fetch(`https://greenz.site/setCountPlayer.php?nameUser=${ctx.from.username}&countMafia=${countMafia}`).then(response => (response.text())).then((data) => __awaiter(this, void 0, void 0, function* () {
            yield console.log("sendMafia");
            let countPlayer = yield JSON.parse(data).countPlayer;
            // await ctx.editMessageText(`Мирные жители: ${countPlayer-countMafia} Мафия: ${countMafia}`);
            (0, setPutanaPlayer_1.setPutanaPlayer)(bot, ctx, countPlayer);
        }));
    });
}
function setAction(bot) {
    bot.action("setCountMafia_1", (ctx) => {
        sendCountMafiaToServer(1, ctx, bot);
    });
    bot.action("setCountMafia_2", (ctx) => {
        sendCountMafiaToServer(2, ctx, bot);
    });
    bot.action("setCountMafia_3", (ctx) => {
        sendCountMafiaToServer(3, ctx, bot);
    });
    bot.action("setCountMafia_4", (ctx) => {
        sendCountMafiaToServer(4, ctx, bot);
    });
}
function setBlackPlayer(ctx, countPlayer, bot) {
    return __awaiter(this, void 0, void 0, function* () {
        function getMafiaKeyBoard(countPlayer) {
            return __awaiter(this, void 0, void 0, function* () {
                function calculateMafiaPlayer(countPlayer) {
                    let arr = [];
                    switch (countPlayer) {
                        case 4: {
                            arr = [[telegraf_1.Markup.button.callback("1 мафия", "setCountMafia_1")]];
                            break;
                        }
                        case 5: {
                            arr = [[telegraf_1.Markup.button.callback("1 мафия", "setCountMafia_1"), telegraf_1.Markup.button.callback('2 мафии', "setCountMafia_2")]];
                            break;
                        }
                        case 6: {
                            arr = [[telegraf_1.Markup.button.callback("1 мафия", "setCountMafia_1"), telegraf_1.Markup.button.callback('2 мафии', "setCountMafia_2")]];
                            break;
                        }
                        case 7: {
                            arr = [[telegraf_1.Markup.button.callback("1 мафия", "setCountMafia_1"), telegraf_1.Markup.button.callback('2 мафии', "setCountMafia_2")],
                                [telegraf_1.Markup.button.callback("3 мафия", "setCountMafia_3")]
                            ];
                            break;
                        }
                        case 8: {
                            arr = [[telegraf_1.Markup.button.callback("1 мафия", "setCountMafia_1"), telegraf_1.Markup.button.callback('2 мафии', "setCountMafia_2")],
                                [telegraf_1.Markup.button.callback("3 мафия", "setCountMafia_3")]
                            ];
                            break;
                        }
                        case 9: {
                            arr = [[telegraf_1.Markup.button.callback("1 мафия", "setCountMafia_1"), telegraf_1.Markup.button.callback('2 мафии', "setCountMafia_2")],
                                [telegraf_1.Markup.button.callback("3 мафия", "setCountMafia_3"), telegraf_1.Markup.button.callback('4 мафии', "setCountMafia_4")]
                            ];
                            break;
                        }
                        default: {
                            arr = [telegraf_1.Markup.button.callback("1 мафия", "setCountMafia_1")];
                            break;
                        }
                    }
                    return arr;
                }
                yield ctx.editMessageText("Выбрано " + countPlayer + " игроков.");
                yield setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield ctx.editMessageText("Выберите количество мафии:");
                    if (calculateMafiaPlayer(countPlayer)) {
                        yield ctx.editMessageReplyMarkup({
                            inline_keyboard: calculateMafiaPlayer(countPlayer)
                        });
                    }
                }), 800);
                setAction(bot);
            });
        }
        getMafiaKeyBoard(countPlayer);
    });
}
exports.setBlackPlayer = setBlackPlayer;
