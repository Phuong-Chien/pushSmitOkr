<template>
    <div class="wrap-left">
        <div class="wrap-left-header">
            <div @click="backCheckin()" class="flex-alignt" style="font-family: Bold; font-size: 16px; margin-bottom: 35px; cursor: pointer">
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
            <div class="wrap-left-body-kr" v-for="(item, index) in data_kr" :key="index" :class="{ active: index === is_open }" @click="selectElement(item, index)">
                <div class="wrap-left-body-kr-left">
                    <div class="wrap-left-body-kr-left-name" :class="{ acti: index === is_open }">KR{{ index + 1 }}</div>
                    <img :src="imgSrc(item.key && item.job.length && item.text && !item.is_delay ? 'icon_xanh.svg' : item.is_delay && item.reason_delay ? 'icon_xanh.svg' : 'icon_xam.svg')" alt="" />
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
    <div class="wrap-right" v-if="!convert">
        <div class="wrap-right-header">
            <div class="wrap-right-header-aa">
                <button class="wrap-right-header-aa-knot" @click="mine = true" :class="{ active: mine }">Tiến độ & Kế hoạch</button>
                <button class="wrap-right-header-aa-knot" @click="mine = false" :class="{ active: !mine }">Lịch sử các kỳ check-in KR</button>
            </div>
            <div class="wrap-right-header-kr" v-if="mine">
                <div class="wrap-right-header-kr-name">KR{{ kr }}</div>
                <div style="font-size: 16px; font-family: semibold; margin-bottom: 30px">{{ selection.key_results }}</div>
            </div>
        </div>
        <template v-if="mine">
            <div class="wrap-right-body">
                <label class="flex-alignt" style="gap: 10px; font-family: Bold; cursor: pointer">
                    <input type="checkbox" @click="selection.is_delay = !selection.is_delay" style="cursor: pointer" v-model="selection.is_delay" />
                    DELAY THIS KR
                </label>
                <template v-if="!selection.is_delay">
                    <div style="border-bottom: 1px dashed #ccc; margin-top: 20px"></div>
                    <div class="square">
                        <div class="square-one">
                            <div class="square-one-name">TIẾN ĐỘ</div>
                            <div class="square-one-inputt">
                                <input class="square-one-inputt-css" type="number" v-model="selection.key" />
                                <div class="square-one-inputt-poisi">
                                    <img :src="imgSrc('phantram.svg')" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="square-two">
                            <div class="square-one-name">CÔNG VIỆC ĐÃ THỰC HIỆN THEO KẾ HOẠCH</div>
                            <div style="position: relative">
                                <div class="popup-class selected-active" @click="clickpageAccount('isCheckbox')">
                                    <div class="a" v-if="selection.job.length">Chọn {{ selection.job.length }} công việc</div>
                                    <div class="a" v-else>Chọn công việc đã thực hiện</div>
                                    <img :src="imgSrc('arrow.svg')" alt="" />
                                </div>
                                <div class="selected-active-popup" v-if="isCheckbox" @click.stop>
                                    <label class="selected-active-popup-con" v-for="(item, index) in selected_task" :key="index">
                                        {{ item.task_name }}
                                        <input type="checkbox" v-model="selection.job" :value="item.task_id" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="square-true">
                            <div class="square-one-name">VẤN ĐỀ - GIẢI PHÁP</div>
                            <div class="square-one-inputt" style="height: 150px">
                                <textarea class="abc" id="w3review" name="w3review" rows="4" cols="50" v-model="selection.text"></textarea>
                            </div>
                        </div>
                        <div class="square-one-name">ĐÁNH GIÁ CHO KR LẦN NÀY</div>
                    </div>
                </template>
                <div v-if="selection.is_delay" class="popup-delay">
                    <div class="popup-delay-reason">
                        <div class="square-one-name">LÍ DO DELAY</div>
                        <textarea class="popup-delay-reason-ip" id="w3review" name="w3review" rows="4" cols="50" v-model="selection.reason_delay"></textarea>
                    </div>
                </div>
            </div>
            <div class="wrap-right-footer">
                <template v-if="!selection.is_delay">
                    <div class="wrap-right-footer-btn">
                        <div style="font-family: semibold">Tự tin:</div>
                        <div class="for-button">
                            <button class="for-button-hai" v-for="(item, index) in button_data" :key="index" :class="{ active: selection.confidence_level === item.key }" @click="clickData(item)">{{ item.title }}</button>
                        </div>
                    </div>
                    <div class="wrap-right-footer-btn">
                        <div style="font-family: semibold">Tốc dộ</div>
                        <div class="for-button">
                            <button class="for-button-hai" v-for="(item, index) in button_slow" :key="index" @click="clickSlow(item)" :class="{ active: selection.progress_speed === item.key }">{{ item.title }}</button>
                        </div>
                    </div>
                </template>
                <div class="two-btn">
                    <button class="two-btn-draft" @click="openDraft({ is_draft: true })">Lưu bản nháp</button>
                    <button style="width: 167px; border-radius: 6px" :disabled="!isSuccess" @click="openContinue()">Tiếp tục</button>
                </div>
            </div>
        </template>
        <template v-if="!mine">
            <div class="wrap-history">
                <div class="wrap-history-header">
                    <div class="wrap-history-header-name">KR CHART</div>
                    <div id="chart" style="margin-top: 15px">
                        <apexchart type="line" height="149" :options="tab.chartOptions" :series="tab.series"></apexchart>
                    </div>
                </div>
                <div class="wrap-history-bordy">
                    <div v-for="(item, index) in history_checkin" :key="index" class="data">
                        <div class="wrap-history-bordy-name">{{ moment(item.created_at).format('DD-MM-YYYY') }}</div>
                        <div style="display: flex; gap: 20px">
                            <img :src="avatar" alt="" style="width: 26px; height: 26px; border-radius: 50%" />
                            <div class="flex-bet" v-if="item.is_delay === true">
                                <div>Lí do: {{ item.reason_delay }}</div>
                                <div class="delayyyy">DELAYED</div>
                            </div>
                            <div class="flex-bet" v-else>
                                <div class="flex-bet-item">
                                    <div>Tiến độ</div>
                                    <div>CV đã thực hiện</div>
                                    <div>Vấn đề - Giải pháp</div>
                                    <div>Tự đánh giá</div>
                                </div>
                                <div class="flex-bet-item" style="text-align: end">
                                    <div class="flex-bet-item-percent">{{ item.percent_kr }}%</div>
                                    <div class="popup-class flex-bet-item-blue" @click="popupTask(index, 'show_popup')">{{ item.list_task.length }} công việc</div>
                                    <div class="popup-class flex-bet-item-blue" @click="popupTask(index, 'show_problem')">Xem</div>
                                    <div style="font-family: Bold">{{ convertSpeedConfidence(item) }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="border-ccc"></div>
                        <div class="bopup" v-if="show_popup === index">
                            <div class="bopup-white">
                                <div style="font-family: Bold">CÔNG VIỆC ĐÃ THỰC HIỆN</div>
                                <div style="color: #000" v-for="x in item.list_task" :key="x.task_id">{{ x.task_name }}</div>
                            </div>
                        </div>
                        <div class="bopup" v-if="show_problem === index">
                            <div class="bopup-white">
                                <div style="font-family: Bold">VẤN ĐỀ - GIẢI PHÁP</div>
                                <div style="color: #000">{{ item.problem_solution }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
    <div class="popup-right" v-if="convert">
        <div class="popup-right-header">
            <div style="font-family: Bold; font-size: 16px; margin-bottom: 15px">Đánh giá chung về mục tiêu này</div>
            <div class="popup-right-header-borderr">
                <div class="popup-right-header-borderr-blue" :style="{ width: percent + '%' }"></div>
            </div>
        </div>
        <div class="popup-right-body">
            <div class="wrap-right-footer-btn">
                <div style="font-family: semibold">Tự tin:</div>
                <div class="for-button">
                    <button class="for-button-hai" v-for="(item, index) in button_task" :key="index" :class="{ active: confidenceTask === item.keyResul }" @click="buttonTask(item)">{{ item.title }}</button>
                </div>
            </div>
            <div class="wrap-right-footer-btn" style="margin-top: 10px">
                <div style="font-family: semibold">Tốc dộ</div>
                <div class="for-button">
                    <button class="for-button-hai" v-for="(item, index) in button_process" :key="index" :class="{ active: confidenceProcess === item.keyResul }" @click="buttonProcess(item)">{{ item.title }}</button>
                </div>
            </div>
            <div style="border-bottom: 1px dashed #ccc; margin-top: 65px"></div>
            <div style="margin-top: 85px">
                <div style="font-family: semibold; color: #ccc; margin-bottom: 10px">ĐẶT LỊCH</div>
                <div class="popup-right-body-radio">
                    <label class="popup-right-body-radio-label" :class="{ bgrcanada: book === 'wait-next' }">
                        <input type="radio" v-model="book" value="wait-next" />
                        Đặt lịch check-in kỳ tiếp theo
                    </label>
                    <label class="popup-right-body-radio-label" :class="{ bgrcanada: book === 'wait-final' }">
                        <input type="radio" v-model="book" value="wait-final" />
                        Đặt lịch tổng kết OKRs
                    </label>
                </div>
                <div style="font-family: semibold; margin-bottom: 10px">Ngày check-in kỳ sau sẽ là:</div>
                <label class="popup-right-body-calendar">
                    <div class="popup-right-body-calendar-flex">
                        <img :src="imgSrc('lich.svg')" alt="" />
                        <flat-pickr v-model="date" />
                    </div>
                    <div style="font-family: semibold; color: #5aabfc">Chọn</div>
                </label>
            </div>
        </div>
        <div class="popup-right-footer">
            <button class="btnDraft" @click="openDraft({ is_draft: true })">Lưu bản nháp</button>
            <button class="btnCheckin" @click="popup_checkin = true">Hoàn thành check-in</button>
        </div>
        <div class="popup-comfrim" v-if="popup_checkin" @click.self="popup_checkin = false">
            <div class="popup-comfrim-white">
                <div>
                    <div style="font-family: Bold">Hoàn thành check-in</div>
                    <div style="font-family: Medium; width: 270px">Bạn có chắc muốn hoàn thành kỳ check-in cho mục tiêu này không ?</div>
                </div>
                <button @click="openDraft({ is_draft: false })">Xác nhận</button>
                <button class="huy" @click="popup_checkin = false">Hủy</button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
export default {
    components: {
        flatPickr
    },
    props: {
        id: {
            type: Number,
            default: 0
        },
        avatar: String
    },
    emits: ['close'],
    data() {
        return {
            data_kr: [],
            object: {},
            button_data: [
                {
                    title: 'Không tự tin',
                    key: 'no-confidence'
                },
                {
                    title: 'Thiếu tự tin',
                    key: 'less-confidence'
                },
                {
                    title: 'Tự tin',
                    key: 'confidence'
                },
                {
                    title: 'Rất tự tin',
                    key: 'very-confidence'
                }
            ],
            button_slow: [
                {
                    title: 'Rất chậm',
                    key: 'very-slow'
                },
                {
                    title: 'Chậm',
                    key: 'slow'
                },
                {
                    title: 'Nhanh',
                    key: 'fast'
                },
                {
                    title: 'Rất nhanh',
                    key: 'very-fast'
                }
            ],
            selected_task: [],
            is_open: -1,
            kr: '',
            selection: {
                key: null,
                text: null,
                reason_delay: null,
                job: [],
                is_delay: false
            },
            convert: false,
            isCheckbox: false,

            // danh gia chung
            button_task: [
                {
                    title: 'Không tự tin',
                    keyResul: 'no-confidence'
                },
                {
                    title: 'Thiếu tự tin',
                    keyResul: 'less-confidence'
                },
                {
                    title: 'Tự tin',
                    keyResul: 'confidence'
                },
                {
                    title: 'Rất tự tin',
                    keyResul: 'very-confidence'
                }
            ],
            button_process: [
                {
                    title: 'Rất chậm',
                    keyResul: 'very-slow'
                },
                {
                    title: 'Chậm',
                    keyResul: 'slow'
                },
                {
                    title: 'Nhanh',
                    keyResul: 'fast'
                },
                {
                    title: 'Rất nhanh',
                    keyResul: 'very-fast'
                }
            ],
            confidenceTask: '',
            confidenceProcess: '',
            popup_checkin: false,
            date: new Date(),
            book: 'wait-next',

            // lich su ky check-in
            mine: true,
            history_checkin: [],
            tab: {
                series: [
                    {
                        name: 'Tiến độ',
                        data: []
                    }
                ],
                chartOptions: {
                    chart: {
                        // height: 430,
                        type: 'line',
                        zoom: {
                            enabled: false
                        },
                        brush: {
                            enabled: false,
                            target: undefined,
                            autoScaleYaxis: false
                        },
                        background: '#F0FBFF',
                        fontFamily: 'Medium',
                        foreColor: '#828282'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    markers: {
                        size: 5
                    },
                    stroke: {
                        width: 2,
                        curve: 'straight'
                    },
                    theme: {
                        mode: 'light',
                        palette: 'palette1',
                        monochrome: {
                            enabled: true,
                            color: '#27AE60',
                            shadeTo: 'light',
                            shadeIntensity: 0.65
                        }
                    },
                    toolbar: {
                        show: false
                    },
                    export: {
                        show: false
                    },
                    tooltip: {
                        show: false
                    },
                    grid: {
                        row: {},
                        yaxis: {
                            lines: {
                                show: false
                            }
                        }
                    },
                    xaxis: {
                        categories: [],
                        lines: {
                            show: false
                        },
                        axisBorder: {
                            show: false
                        }
                    },
                    yaxis: {
                        show: false,
                        lines: {
                            show: false
                        }
                    }
                }
            },
            show_popup: '',
            show_problem: '',
            moment
        }
    },
    methods: {
        imgSrc(name) {
            return '/img/check-in/' + name
        },
        clickData(item) {
            this.selection.confidence_level = item.key
        },
        clickSlow(item) {
            this.selection.progress_speed = item.key
        },
        backCheckin() {
            this.$emit('close')
        },
        async getDataKr() {
            let res = await this.$api({
                url: '/list-kr',
                method: 'POST',
                data: {
                    object_id: this.id
                }
            })
            if (res.success) {
                this.data_kr = res.data_kr.map(item => {
                    return {
                        ...item,
                        // neu co gia tri thi item.confidence_level || neu khong thi dung mac dinh
                        confidence_level: item.confidence_level || 'confidence',
                        progress_speed: item.progress_speed || 'fast',
                        job: item.list_task || [],
                        key: item.percent_kr || null,
                        text: item.problem_solution || null,
                        reason_delay: item.reason_delay || null,
                        is_delay: item.is_delay || false
                    }
                })
            }

            this.object = res.object

            if (this.object) {
                this.confidenceTask = res.object.confidence_level || 'confidence'
                this.confidenceProcess = res.object.progress_speed || 'fast'
                this.book = res.object.type_schedule || 'wait-next'
                this.date = moment(res.object.schedule_time).format('YYYY-MM-DD HH:mm:ss.SSS+00')
            }
            this.selectElement(this.data_kr[0], 0)
        },
        selectElement(item, index) {
            this.is_open = index
            this.kr = index + 1
            this.selection = item
            this.convert = false
            this.selectedKr(item.id)
            this.history(item.id)
        },
        isInputFull(item) {
            if ((item.key && item.job.length && item.text) || item.reason_delay) return true
            return false

            // html
            // dùng để khi viết đủ hết thì sẽ hiện active xanh, chưa đủ thì ko active
            //  <!-- <div v-if="isInputFull(item)">
            //             <img :src="imgSrc('icon_xanh.svg')" alt="" />
            //         </div>
            //         <div v-else>
            //             <img :src="imgSrc('icon_xam.svg')" alt="" />
            //         </div> -->
        },
        async selectedKr(kr_id) {
            let res = await this.$api({
                url: '/list-task',
                method: 'POST',
                data: {
                    object_id: this.id,
                    kr_id: kr_id
                }
            })
            this.selected_task = res.data
        },
        clickpageAccount(data) {
            this[data] = !this[data]
            if (this[data]) {
                const closeFunction = event => {
                    if (!event.target.closest('.popup-class')) {
                        this[data] = false
                        window.removeEventListener('click', closeFunction)
                    }
                }
                window.addEventListener('click', closeFunction)
            }
        },
        async openDraft(is_draft) {
            let save_draft = await Promise.all(
                this.data_kr.map(async item => {
                    return {
                        kr_id: item.id,
                        progress: item.key || 0,
                        problem_solution: item.text,
                        confidence_level: item.confidence_level,
                        progress_speed: item.progress_speed,
                        reason_delay: item.reason_delay,
                        list_task: item.job,
                        is_delay: item.is_delay
                    }
                })
            )

            let evalute_obj = {
                confidence_level: this.confidenceTask,
                progress_speed: this.confidenceProcess,
                type_schedule: this.book,
                schedule_time: moment(this.date).format('YYYY-MM-DD')
            }

            let res = await this.$api({
                url: '/checkin-kr',
                method: 'POST',
                data: {
                    object_id: this.id,
                    is_draft: is_draft.is_draft,
                    list_kr: save_draft,
                    evalute_obj: evalute_obj
                }
            })
            if (res.error) return this.$toast.error(res.message)
            location.reload()
        },
        openContinue() {
            this.convert = true
            this.is_open = false
        },
        // danh gia chung
        buttonTask(item) {
            this.confidenceTask = item.keyResul
        },
        buttonProcess(item) {
            this.confidenceProcess = item.keyResul
        },

        // lich su ky check-in
        async history(id_kr) {
            let res = await this.$api({
                url: '/history-checkin-kr',
                method: 'POST',
                data: {
                    kr_id: id_kr
                }
            })
            if (res.success) {
                this.tab.series[0].data = []
                res.data.map(item => {
                    this.tab.series[0].data.push(Number(item.percent_kr))
                    this.tab.chartOptions.xaxis.categories.push(moment(item.created_at).format('DD-MM'))
                })

                this.history_checkin = res.data.reverse()
            }
        },
        popupTask(index, data) {
            this[data] = index
            if (this[data] !== '') {
                const closeFunction = event => {
                    if (!event.target.closest('.popup-class')) {
                        this[data] = ''
                        window.removeEventListener('click', closeFunction)
                    }
                }
                window.addEventListener('click', closeFunction)
            }
        },
        convertSpeedConfidence(item) {
            let { confidence_level, progress_speed } = item
            let confidence_text = this.button_data.find(x => x.key == confidence_level)?.title || ''
            let progress_text = this.button_slow.find(x => x.key == progress_speed)?.title || ''
            return `${confidence_text} - ${progress_text}`
        }
    },
    created() {
        this.getDataKr()
        this.selectedKr()
        this.history()
    },
    computed: {
        isSuccess() {
            return this.data_kr.every(item => this.isInputFull(item))
        },
        percent() {
            let res = this.data_kr.reduce((sum, num) => {
                return (sum += num.key)
            }, 0)
            return res / this.data_kr.length
        }
    }
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
                text-align: center;

                &-name {
                    font-family: Bold;
                    width: 40px;
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
                gap: 5px;

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
    position: relative;

    &-header {
        padding: 20px 45px 0;

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
        padding: 0 45px;

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
                        right: -1px;
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

                .selected-active {
                    display: flex;
                    justify-content: space-between;
                    height: 50px;
                    background: #fff;
                    border: 1px solid #ccc;
                    border-radius: 12px;
                    align-items: center;
                    padding: 12px;
                    cursor: pointer;

                    .a {
                        font-family: semibold;
                    }

                    &-popup {
                        width: 100%;
                        background: #fff;
                        padding: 10px;
                        border: 1px solid #ccc;
                        border-radius: 12px;
                        z-index: 99;
                        position: absolute;
                        top: 60px;
                        left: 0;
                        height: 200px;
                        overflow: auto;

                        &-con {
                            font-family: semibold;
                            padding: 13px 20px;
                            border-radius: 10px;
                            display: flex;
                            justify-content: space-between;
                            cursor: pointer;

                            &:hover {
                                background: #ccc;
                            }
                        }
                    }
                }
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

    .popup-delay {
        &-reason {
            margin-top: 40px;
            display: flex;
            flex-direction: column;
            gap: 10px;

            &-ip {
                width: 100%;
                height: 150px;
                border: 1px solid #ccc;
                border-radius: 12px;
                padding: 8px;
            }
        }
    }

    &-footer {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px 45px;

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
            bottom: 30px;
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

.popup-right {
    width: calc(100% - 573px);
    height: 100%;
    background: #fff;
    padding: 30px 45px;
    position: relative;

    &-header {
        &-borderr {
            width: 100%;
            height: 6px;
            background: #ccc;
            border-radius: 12px;
            margin-bottom: 45px;

            &-blue {
                height: 6px;
                border-radius: 12px;
                background: #3893ed;
            }
        }
    }

    &-body {
        &-radio {
            display: flex;
            align-items: center;
            gap: 10px;

            &-label {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                width: 50%;
                height: 44px;
                border-radius: 8px;
                border: 1px solid #ccc;
                padding: 10px;
                font-family: semibold;
                margin-bottom: 30px;
            }
            .bgrcanada {
                background: #eff9ff;
                border: 1px solid #3d99f4;
            }
        }

        &-calendar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #ccc;
            height: 45px;
            border-radius: 10px;
            padding: 10px 20px;
            cursor: pointer;

            &-flex {
                display: flex;
                align-items: center;
                gap: 8px;
                font-family: Bold;
            }
        }
    }

    &-footer {
        .btnCheckin {
            position: absolute;
            bottom: 30px;
            right: 45px;
            border-radius: 8px;
        }
        .btnDraft {
            background: #fff;
            border: 1px solid #56aaff;
            border-radius: 6px;
            color: #56aaff;
            width: 167px;
            position: absolute;
            bottom: 30px;
            right: 210px;
            border-radius: 8px;

            &:hover {
                opacity: 0.6;
            }
        }
    }

    .popup-comfrim {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.2);
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.2s;

        &-white {
            display: inline-flex;
            padding: 20px;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            border-radius: 10px;
            background: #fff;
        }

        .huy {
            border: 1px solid #ccc;
            color: #000;
            background: #fff;
            margin-top: -10px;
        }
    }
}

.wrap-history {
    height: calc(100% - 90px);
    overflow: auto;

    &-header {
        padding: 0 45px;

        &-name {
            font-family: semibold;
            color: #ccc;
        }
    }

    &-bordy {
        padding: 0 45px;
        display: flex;
        flex-direction: column;
        gap: 30px;

        .data:nth-child(1) {
            margin-top: 40px;
        }

        &-name {
            margin-bottom: 10px;
            font-family: semibold;
        }

        .flex-bet {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            &-item {
                display: flex;
                flex-direction: column;
                gap: 16px;

                &-percent {
                    font-family: Bold;
                    color: #06c964;
                }

                &-blue {
                    color: #56aaff;
                    font-family: Bold;
                    cursor: pointer;

                    &:hover {
                        opacity: 0.7;
                    }
                }
            }
        }

        .delayyyy {
            font-size: 11px;
            font-family: semibold;
            color: #fff;
            background: red;
            border-radius: 12px;
            padding: 6px;
        }

        .bopup {
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: 99;
            background-color: rgba(0, 0, 0, 0.2);
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;

            &-white {
                display: inline-flex;
                padding: 20px;
                flex-direction: column;
                align-items: flex-start;
                gap: 20px;
                border-radius: 10px;
                background: #fff;
                width: 400px;
                height: 500px;
            }
        }
    }

    .border-ccc {
        margin-top: 30px;
        border: 1px dashed #ccc;
    }
}
</style>
