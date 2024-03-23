<template>
    <div class="analysis-left">
        <div class="analysis-left-header">
            <div class="flex-alignt" style="font-family: Bold; cursor: pointer" @click="back">
                <img :src="imgSrc('back.svg')" alt="" />
                Back
            </div>
            <div style="font-family: Bold; margin-top: 10px">Lịch sử các kỳ check-in</div>
            <div style="font-family: semibold; color: #ccc; margin: 15px 0">Mục tiêu:</div>
            <div style="font-family: Bold">{{ name }}</div>
        </div>
        <div class="analysis-left-body flex-colum">
            <div class="analysis-left-body-rectangle" v-for="(item, index) in table.data" :key="index" :class="{ active: index === table.is_open }" @click="selectElement(item, index)">
                <div>Kỳ check-in: {{ item.created_at }}</div>
                <div class="flex-alignt" style="gap: 10px; margin-top: 10px">
                    <div class="analysis-left-body-rectangle-border">
                        <div class="analysis-left-body-rectangle-border-css" :style="[{ width: item.progress + '%' }, { background: item.progress >= 80 ? '#27AE60' : item.progress >= 20 ? '#F2C94C' : '#ff0000' }]"></div>
                    </div>
                    <div>{{ item.progress }}%</div>
                </div>
            </div>
        </div>
    </div>
    <div class="analysis-right">
        <div class="analysis-right-header">
            <div style="font-family: Bold">Phản hồi</div>
            <div style="margin-bottom: 30px">Kỳ: {{ ngay }}</div>
            <div class="analysis-right-header-two">
                <button class="analysis-right-header-two-button" @click="table.history = true" :class="{ active: table.history }">Lịch sử phản hồi mục tiêu</button>
                <button class="analysis-right-header-two-button" @click="table.history = false" :class="{ active: !table.history }">Lịch sử KR</button>
            </div>
        </div>
        <div class="analysis-right-body" v-if="table.history">
            <div class="flex-colum" style="gap: 50px; padding: 20px 60px">
                <div v-for="(item, index) in table.conversation" :key="index">
                    <div class="flex-alignt" style="gap: 10px; margin-right: 50px" v-if="item.user === 'checkin'">
                        <img :src="table.user_checkin.avatar" alt="" style="width: 32px; height: 32px; border-radius: 50%" />
                        <div class="tab-xanh">
                            <div style="color: #cecece">{{ item.date }}</div>
                            <div style="margin-top: 10px">{{ item.send }}</div>
                        </div>
                    </div>
                    <div class="flex-alignt" style="gap: 10px; margin-left: 50px" v-else>
                        <div class="tab-trang">
                            <div style="color: #cecece">{{ item.date }}</div>
                            <div style="margin-top: 10px">{{ item.send }}</div>
                        </div>
                        <img :src="table.user_response.avatar" alt="" style="width: 32px; height: 32px; border-radius: 50%" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="flex-colum" style="padding: 20px 60px">
                <div v-for="(item, index) in table.kr_log" :key="index">
                    <div class="flex-alignt" style="gap: 10px">
                        <div class="kr">KR{{ index + 1 }}</div>
                        <div style="font-family: Bold">{{ item.key_results }}</div>
                    </div>
                    <div class="flex-space" style="margin-top: 25px">
                        <div class="flex-colum" style="gap: 15px">
                            <div>Tiến độ</div>
                            <div>CV đã thực hiện</div>
                            <div>Vấn đề - Giải pháp</div>
                            <div>Tự đánh giá</div>
                        </div>
                        <div class="flex-colum" style="gap: 15px; text-align: end">
                            <div style="font-family: Bold; color: #06c964">{{ item.percent_kr }}%</div>
                            <div class="popup-class bule" @click="popupTask(index, 'show_popup')">{{ item.list_task.length }} công việc</div>
                            <div class="popup-class bule" @click="popupTask(index, 'show_problem')">Xem</div>
                            <div style="font-family: Bold">{{ convertSpeedConfidence(item) }}</div>
                        </div>
                    </div>
                    <div class="thesoc"></div>
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
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props: {
        id_okr: {
            type: Number,
            default: 0
        }
    },
    emits: ['close'],

    data() {
        return {
            table: {
                history: true,
                data: [],
                is_open: 0,
                conversation: [],
                user_checkin: {},
                user_response: {},
                kr_log: []
            },
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
            show_popup: '',
            show_problem: '',
            name: '',
            ngay: ''
        }
    },
    methods: {
        imgSrc(name) {
            return '/img/phan-tich/' + name
        },
        async getObjectKr() {
            let res = await this.$api({
                url: '/feed-back-log-object',
                method: 'POST',
                data: {
                    period_id: 1,
                    object_id: this.id_okr
                }
            })
            if (res.success) {
                this.table.data = res.object.map(item => {
                    return {
                        ...item,
                        created_at: moment(item.created_at).format('DD-MM-YYYY')
                    }
                })
            }
            this.selectElement(this.table.data[0], 0)
        },
        selectElement(item, index) {
            this.table.is_open = index
            this.name = item.object
            this.ngay = item.created_at
            this.getDataConver(item.object_log_id)
        },
        async getDataConver(obj_id) {
            let res = await this.$api({
                url: '/feed-back-detail',
                method: 'POST',
                data: {
                    object_log_id: obj_id
                }
            })
            if (res.success) {
                this.table.conversation = res.conversation.map(item => {
                    return {
                        ...item,
                        date: moment(item.created_at).format('DD-MM-YYYY hh:mm')
                    }
                })
                this.table.user_checkin = res.user_checkin
                this.table.user_response = res.user_response
                this.table.kr_log = res.kr_log
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
        },
        back() {
            this.$emit('close')
        }
    },
    created() {
        this.getObjectKr()
    }
}
</script>

<style lang="scss">
.analysis-left {
    width: 507px;
    // height: 100%;
    background: #fff;

    &-header {
        padding: 35px 45px;
    }
    &-body {
        padding: 0 45px;
        overflow: auto;
        height: calc(100% - 185px);

        &-rectangle {
            width: 100%;
            height: 64px;
            background: #f2f2f2;
            border-radius: 10px;
            border: 1px solid transparent;
            padding: 10px 20px;
            cursor: pointer;

            &-border {
                width: 100%;
                background: #e0e0e0;
                border-radius: 5px;
                height: 6px;

                &-css {
                    height: 6px;
                    border-radius: 5px;
                }
            }
        }
        .active {
            background: #eaf1f7;
            border: 1px solid #2d9cdb;
        }
    }
}
.analysis-right {
    width: calc(100% - 507px);
    // height: 100%;

    &-header {
        padding: 30px 60px;

        &-two {
            display: flex;
            height: 40px;
            padding: 3px;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            background: #f5f5f5;

            &-button {
                color: #000;
                font-family: semibold;
                line-height: 20px;
                display: flex;
                padding: 3px 1px;
                justify-content: center;
                align-items: center;
                border-radius: 8px;
                cursor: pointer;
                background: #f5f5f5;
                width: 100%;

                &:hover {
                    background: #ededed;
                }
            }
            .active {
                background: #fff;
                color: #1f2937;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
            }
        }
    }

    &-body {
        overflow: auto;
        height: calc(100% - 164px);

        .tab-xanh {
            width: 100%;
            height: 80px;
            background: #449cf4;
            border-radius: 12px;
            padding: 11px 16px;
        }
        .tab-trang {
            width: 100%;
            background: #eaeaea;
            border-radius: 12px;
            padding: 11px 16px;
        }
    }

    .kr {
        color: #fff;
        background: #06ad06;
        font-family: semibold;
        width: 40px;
        height: 25px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .thesoc {
        border: 1px dashed #ccc;
        width: 100%;
        margin-top: 18px;
        margin-bottom: 15px;
    }

    .bule {
        color: #56aaff;
        font-family: Bold;
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }
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
</style>
