<template>
    <div class="wrap-left">
        <div class="wrap-left-header">
            <div class="flex-alignt" style="font-family: Bold; font-size: 16px; margin-bottom: 35px; cursor: pointer">
                <img :src="imgSrc('muiten.svg')" alt="" />
                Back
            </div>
            <div class="flex-alignt" style="font-family: Bold; font-size: 16px; margin-bottom: 17px; gap: 8px">
                <img :src="imgSrc('okr.svg')" alt="" />
                Mục tiêu:
            </div>
            <div style="font-family: Bold; font-size: 16px; margin-bottom: 35px">{{ object.object }}</div>
        </div>
        <div class="wrap-left-body">
            <div class="wrap-left-body-kr" v-for="(item, index) in data_kr" :key="index" :class="{ active: index === is_open }" @click="selectElement(index)">
                <div class="wrap-left-body-kr-left">
                    <div class="wrap-left-body-kr-left-name" :class="{ acti: index === is_open }">KR{{ index + 1 }}</div>
                    <div class="icon-xam" :class="{ bgr: index === is_open }"></div>
                </div>
                <div class="wrap-left-body-kr-right">
                    {{ item.key_results }}
                    <div class="borderrr">
                        <div class="borderrr-grey">
                            <div class="borderrr-grey-green" :style="[{ width: item.original_percent_kr + '%' }, { background: item.original_percent_kr >= 80 ? '#27AE60' : item.original_percent_kr >= 20 ? '#F2C94C' : '#ff0000' }]"></div>
                        </div>
                        <div style="font-family: Bold">{{ item.original_percent_kr }}%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="wrap-right">
        <div class="wrap-right-header">
            <div class="wrap-right-header-aa">
                <button class="wrap-right-header-aa-knot" @click="mine = true" :class="{ active: mine }">Tiến độ & Kế hoạch</button>
                <button class="wrap-right-header-aa-knot" @click="mine = false" :class="{ active: !mine }">Lịch sử các kỳ check-in KR</button>
            </div>
            <div class="wrap-right-header-kr">
                <div class="wrap-right-header-kr-name">KR2</div>
                <div style="font-size: 16px; font-family: semibold; margin-bottom: 30px">ong cau beo vl</div>
            </div>
        </div>
        <div class="wrap-right-body">
            <label class="flex-alignt" style="gap: 10px; font-family: Bold; cursor: pointer">
                <input type="checkbox" />
                DELAY THIS KR
            </label>
            <div style="border-bottom: 1px dashed #ccc; margin-top: 20px"></div>
            <div class="square">
                <div class="square-one">
                    <div class="square-one-name">TIẾN ĐỘ</div>
                    <div class="square-one-inputt">
                        <input class="square-one-inputt-css" type="text" />
                        <div class="square-one-inputt-poisi">
                            <img :src="imgSrc('phantram.svg')" alt="" />
                        </div>
                    </div>
                </div>
                <div class="square-two">
                    <div class="square-one-name">CÔNG VIỆC ĐÃ THỰC HIỆN THEO KẾ HOẠCH</div>
                    <Work :options="['Hoàn thành việc A', 'Hoàn thành việc B', 'Hoàn thành việc C', 'Hoàn thành việc D']" :default="'Chọn công việc đã thực hiện'" />
                </div>
                <div class="square-true">
                    <div class="square-one-name">VẤN ĐỀ - GIẢI PHÁP</div>
                    <div class="square-one-inputt" style="height: 150px">
                        <textarea class="abc" id="w3review" name="w3review" rows="4" cols="50"></textarea>
                    </div>
                </div>
                <div class="square-one-name">ĐÁNH GIÁ CHO KR LẦN NÀY</div>
            </div>
        </div>
        <div class="wrap-right-footer">
            <div class="wrap-right-footer-btn">
                <div style="font-family: semibold">Tự tin:</div>
                <div class="for-button">
                    <button class="for-button-hai" v-for="(item, index) in button_data" :key="index" @click="clickActive(item)" :class="{ active: item.btn_atv }">{{ item.title }}</button>
                </div>
            </div>
            <div class="wrap-right-footer-btn">
                <div style="font-family: semibold">Tốc dộ</div>
                <div class="for-button">
                    <button class="for-button-hai" v-for="(item, index) in button_slow" :key="index" @click="clickSlow(item)" :class="{ active: item.btn_slow }">{{ item.title }}</button>
                </div>
            </div>
            <div class="two-btn">
                <button class="two-btn-draft">Lưu bản nháp</button>
                <button style="width: 167px; border-radius: 6px">Tiếp tục</button>
            </div>
        </div>
    </div>
</template>

<script>
import Work from '../components/Work.vue'
export default {
    components: {
        Work
    },
    data() {
        return {
            data_kr: [],
            object: {},
            button_data: [
                {
                    title: 'Không tự tin',
                    btn_atv: false
                },
                {
                    title: 'Thiếu tự tin',
                    btn_atv: false
                },
                {
                    title: 'Tự tin',
                    btn_atv: true
                },
                {
                    title: 'Rất tự tin',
                    btn_atv: false
                }
            ],
            button_slow: [
                {
                    title: 'Rất chậm',
                    btn_slow: false
                },
                {
                    title: 'Chậm',
                    btn_slow: false
                },
                {
                    title: 'Nhanh',
                    btn_slow: true
                },
                {
                    title: 'Rất nhanh',
                    btn_slow: false
                }
            ],
            mine: true,
            is_open: 0
        }
    },
    methods: {
        imgSrc(name) {
            return '/img/check-in/' + name
        },
        clickActive(item) {
            this.button_data.forEach(item => {
                item.btn_atv = false
            })
            item.btn_atv = true
        },
        clickSlow(item) {
            this.button_slow.forEach(item => {
                item.btn_slow = false
            })
            item.btn_slow = true
        },
        async getDataKr() {
            let res = await this.$api({
                url: '/list-kr',
                method: 'POST',
                data: {
                    object_id: 1184
                }
            })

            if (res.success) {
                this.data_kr = res.data_kr.map(item => {
                    return {
                        ...item
                    }
                })
            }
            // console.log(res.data_kr)
            this.data_kr = res.data_kr
            this.object = res.object
        },
        selectElement(index) {
            this.is_open = index
        }
    },
    created() {
        this.getDataKr()
    },
    computed: {}
}
</script>

<style lang="scss">
$url: '/img/check-in/';

.wrap-left {
    width: 573px;
    height: 100%;
    padding: 35px 37px;

    &-body {
        display: flex;
        flex-direction: column;
        gap: 12px;

        &-kr {
            display: flex;
            align-items: center;
            gap: 14px;
            background: #fff;
            border-radius: 12px;
            padding: 15px 10px;
            height: 91px;
            cursor: pointer;

            &-left {
                display: flex;
                flex-direction: column;
                gap: 10px;
                align-items: center;
                width: 40px;
                height: 56px;

                &-name {
                    font-family: Bold;
                }

                .icon-xam {
                    -webkit-mask-image: url($url + 'icon_xam.svg');
                    width: 24px;
                    height: 24px;
                    background: #ccc;
                }

                .bgr {
                    background: #01b201;
                }

                .acti {
                    background: #2d9cdb;
                    width: 40px;
                    height: 25px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                }
            }

            &-right {
                display: flex;
                flex-direction: column;
                gap: 10px;

                .borderrr {
                    display: flex;
                    align-items: center;
                    gap: 25px;

                    &-grey {
                        width: 360px;
                        height: 6px;
                        border-radius: 5px;
                        background: #e0e0e0;

                        &-green {
                            height: 6px;
                            border-radius: 5px;
                        }
                    }
                }
            }
        }
        .active {
            border: 1px solid #56aaff;
        }
    }
}

.wrap-right {
    width: calc(100% - 573px);
    height: 100%;
    background: #fff;
    padding: 40px 45px;
    position: relative;

    &-header {
        &-aa {
            display: flex;
            height: 40px;
            padding: 3px;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            background: #f0fbff;
            margin-bottom: 35px;

            &-knot {
                color: #000;
                font-family: Medium;
                line-height: 20px;
                display: flex;
                padding: 3px 1px;
                justify-content: center;
                align-items: center;
                gap: 10px;
                flex: 1 0 0;
                border-radius: 8px;
                cursor: pointer;
                background: #f0fbff;

                &:hover {
                    background: #e7f7ff;
                }
            }
            .active {
                background: #fff;
                color: #1f2937;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
            }
        }

        &-kr {
            &-name {
                font-family: 'Bold';
                background: #2d9cdb;
                width: 40px;
                height: 25px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 10px;
                color: #fff;
            }
        }
    }

    &-body {
        .square {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;

            &-one {
                display: flex;
                flex-direction: column;
                gap: 10px;

                &-name {
                    font-family: semibold;
                    color: #ccc;
                }

                &-inputt {
                    height: 50px;
                    position: relative;

                    &-css {
                        width: 100%;
                        height: 100%;
                        border: 1px solid #ccc;
                        border-radius: 12px;
                        padding: 12px;
                    }

                    &-poisi {
                        position: absolute;
                        right: 0;
                        background: #e7e6e6;
                        width: 50px;
                        height: 50px;
                        top: 0;
                        border-radius: 14px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }

            &-two {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            &-true {
                display: flex;
                flex-direction: column;
                gap: 10px;

                .abc {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #ccc;
                    border-radius: 12px;
                    padding: 12px;
                }
            }
        }
    }

    &-footer {
        display: flex;
        flex-direction: column;
        gap: 10px;

        &-btn {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .for-button {
                display: flex;
                align-items: center;
                gap: 10px;

                &-hai {
                    background: #fff;
                    color: #000;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    width: 144px;
                    font-family: semibold;
                }

                .active {
                    background: #d5fbe5;
                    border: 1px solid green;
                }
            }
        }

        .two-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            position: absolute;
            bottom: 40px;
            right: 45px;

            &-draft {
                background: #fff;
                border: 1px solid #56aaff;
                border-radius: 6px;
                color: #56aaff;
                width: 167px;

                &:hover {
                    opacity: 0.6;
                }
            }
        }
    }
}
</style>
