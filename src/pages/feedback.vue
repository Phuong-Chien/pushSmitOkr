<template>
    <div class="wrap" v-if="hidden">
        <div class="wrap-feeback">
            <div class="wrap-feeback-header">
                <div class="wrap-feeback-header-left">
                    <button class="wrap-feeback-header-left-button" @click="getFeedback('me')" :class="{ active: tab.type === 'me' }">Tôi check-in</button>
                    <button class="wrap-feeback-header-left-button" @click="getFeedback('with_me')" :class="{ active: tab.type === 'with_me' }">Check-in với tôi</button>
                </div>
                <div class="wrap-feeback-header-right">
                    <div class="wrap-feeback-header-right-canader">
                        <img :src="imgSrc('lich.svg')" alt="" />
                        <div style="font-family: Medium">Tháng 1 - Tháng 3 năm 2024</div>
                    </div>
                    <label class="wrap-feeback-header-right-search">
                        <img :src="imgSrc('search.svg')" alt="" />
                        <input type="text" placeholder="Tìm kiếm mục tiêu..." />
                    </label>
                </div>
            </div>
            <div class="wrap-feeback-body" v-if="tab.type === 'me'">
                <div v-for="(item, index) in tab.data" :key="index">
                    <div class="flex-space">
                        <div class="flex-alignt" style="gap: 10px">
                            <img :src="item.avatar" alt="" style="width: 40px; height: 40px; border-radius: 50%" />
                            <div>
                                <div style="font-family: Medium; margin-bottom: 5px">Mục tiêu: {{ item.object }}</div>
                                <div style="font-family: Medium; color: #ccc">Kỳ check in: {{ item.schedule_time }}</div>
                            </div>
                        </div>
                        <div>
                            <button class="detail" @click="openDetail(item)">
                                <img :src="imgSrc('detai.svg')" alt="" />
                                Chi tiết
                            </button>
                        </div>
                    </div>
                    <div class="dash"></div>
                </div>
            </div>
            <div class="wrap-feeback-body" v-else>
                <div v-for="(item, index) in tab.data" :key="index">
                    <div class="flex-space">
                        <div class="flex-alignt" style="gap: 10px">
                            <img :src="item.avatar" alt="" style="width: 40px; height: 40px; border-radius: 50%" />
                            <div>
                                <div style="font-family: Medium; margin-bottom: 5px">Mục tiêu: {{ item.object }}</div>
                                <div style="font-family: Medium; color: #ccc">Kỳ check in: {{ item.schedule_time }}</div>
                            </div>
                        </div>
                        <div>
                            <button class="detail" @click="openDetail(item)">
                                <img :src="imgSrc('detai.svg')" alt="" />
                                {{ item.is_evaluated ? 'Chi tiết' : 'Phản hồi' }}
                            </button>
                        </div>
                    </div>
                    <div class="dash"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="wrap-list-detail" v-else>
        <div class="wrap-list-detail-left" v-if="!feature">
            <div style="font-family: Bold; font-size: 16px; padding: 25px 35px; cursor: pointer" class="flex-alignt" @click="hidden = true">
                <img :src="imgSrc('muiten.svg')" alt="" />
                Quay lại bảng
            </div>
            <div style="font-family: Bold; font-size: 16px; margin-bottom: 50px; padding: 0 35px">Lịch sử các kỳ check in</div>
            <div class="wrap-list-detail-left-body">
                <div class="flex-alignt" style="gap: 10px">
                    <img :src="tab.user_checkin.avatar" alt="" style="width: 32px; height: 32px; border-radius: 50%" />
                    <div class="tab-xanh">
                        <div style="color: #ccc; margin-bottom: 9px">{{ moment(tab.object_info.created_at).format('DD-MM-YYYY H:H') }}</div>
                        <div style="color: #fff">Đã checkin ngày {{ moment(tab.object_info.created_at).format('DD-MM-YYYY') }}</div>
                    </div>
                </div>
                <div class="flex-alignt" style="gap: 10px; margin: 50px 0 50px 50px" v-if="is_evaluated">
                    <div class="tab-trang">
                        <div class="flex-space" style="margin-bottom: 10px">
                            <div style="font-family: Bold; color: #56aaff">{{ format(tab.object_response) }}</div>
                            <div style="color: #cecece">{{ moment(tab.object_response.created_at).format('DD-MM-YYYY H:H') }}</div>
                        </div>
                        <div>{{ tab.object_response.content }}</div>
                    </div>
                    <img :src="tab.user_response.avatar" alt="" style="width: 32px; height: 32px; border-radius: 50%" />
                </div>
                <div class="flex-colum" style="gap: 50px">
                    <div v-for="(item, index) in conversation" :key="index">
                        <div class="flex-alignt" style="gap: 10px; margin-right: 50px" v-if="item.user === 'checkin'">
                            <img :src="tab.user_checkin.avatar" alt="" style="width: 32px; height: 32px; border-radius: 50%" />
                            <div class="tab-xanh">
                                <div style="color: #cecece">{{ moment(item.created_at).format('DD-MM-YYYY hh:mm') }}</div>
                                <div style="margin-top: 10px">{{ item.send }}</div>
                            </div>
                        </div>
                        <div class="flex-alignt" style="gap: 10px; margin-left: 50px" v-else>
                            <div class="tab-trang">
                                <div style="color: #cecece">{{ moment(item.created_at).format('DD-MM-YYYY hh:mm') }}</div>
                                <div style="margin-top: 10px">{{ item.send }}</div>
                            </div>
                            <img :src="tab.user_response.avatar" alt="" style="width: 32px; height: 32px; border-radius: 50%" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="is_evaluated" style="padding: 0 35px">
                <div class="wrap-list-detail-left-footer">
                    <input type="text" placeholder="Trả lời phản hồi" v-model="tab.send" v-on:keyup.enter="onEnter" />
                    <img :src="imgSrc('muitenright.svg')" alt="" />
                </div>
            </div>
        </div>
        <div class="wrap-evaluated-left" v-else>
            <div style="font-family: Bold; font-size: 16px; margin-bottom: 20px; cursor: pointer" class="flex-alignt" @click="hidden = true">
                <img :src="imgSrc('muiten.svg')" alt="" />
                Quay lại bảng
            </div>
            <div class="flex-colum" style="margin-bottom: 50px">
                <div class="flex-colum" style="gap: 10px">
                    <div style="font-family: semibold">Loại phản hồi</div>
                    <div class="flex-alignt" style="gap: 10px">
                        <button class="buttom-xam" v-for="item in tab.feedback.button_response" :key="item.key" :class="{ bgr: tab.feedback.selected === item.key }" @click="tab.feedback.selected = item.key">{{ item.title }}</button>
                    </div>
                </div>
                <div class="flex-colum" style="gap: 10px">
                    <div style="font-family: semibold">Nỗ lực nhân viên</div>
                    <div class="flex-alignt" style="gap: 10px">
                        <button class="buttom-xam" v-for="item in tab.effort.button_effort" :key="item.key" :class="{ bgr: tab.effort.staff === item.key }" @click="tab.effort.staff = item.key">{{ item.title }}</button>
                    </div>
                </div>
                <div class="flex-colum" style="gap: 10px">
                    <div style="font-family: semibold">Hiệu suất nhân viên</div>
                    <div class="flex-alignt" style="gap: 10px">
                        <button class="buttom-xam" v-for="item in tab.efficiency.button_efficiency" :key="item.key" :class="{ bgr: tab.efficiency.selection === item.key }" @click="tab.efficiency.selection = item.key">{{ item.title }}</button>
                    </div>
                </div>
            </div>
            <div class="flex-colum" style="gap: 10px">
                <div style="font-family: Bold">Nội dung phản hồi</div>
                <textarea class="textarea-id" v-model="tab.text" id="w3review" name="w3review" rows="4" cols="50" placeholder="Nhập nội dung bạn muốn phản hồi và lời khuyên, hướng dẫn"></textarea>
            </div>
            <button class="send" @click="openEvaluate()" :disabled="!tab.text">Gửi phản hồi</button>
        </div>
        <div class="wrap-list-detail-right">
            <div class="wrap-list-detail-right-header">
                <div style="font-family: Bold; margin-bottom: 10px">{{ tab.object_info.object }}</div>
                <div class="flex-alignt" style="gap: 25px">
                    <div class="percent">
                        <div class="percent-ccc" :style="[{ width: tab.object_info.progress + '%' }, { background: tab.object_info.progress >= 80 ? '#27AE60' : tab.object_info.progress >= 20 ? '#F2C94C' : '#ff0000' }]"></div>
                    </div>
                    <div>{{ tab.object_info.progress }}%</div>
                </div>
                <div class="flex-alignt" style="gap: 10px; font-family: Bold; margin-top: 15px">
                    Kỳ check in
                    <div>{{ moment(tab.object_info.created_at).format('DD-MM-YYYY') }}</div>
                </div>
            </div>
            <div class="thengang"></div>
            <div class="wrap-list-detail-right-body">
                <div class="flex-colum">
                    <div v-for="(item, index) in tab.list_detail" :key="index">
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
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            moment,
            tab: {
                data: [],
                object_info: {},
                list_detail: [],
                user_checkin: {},
                user_response: {},
                object_response: {},
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
                type: 'me',
                feedback: {
                    button_response: [
                        {
                            title: 'Tích cực',
                            key: 'positive'
                        },
                        {
                            title: 'Tiêu cực',
                            key: 'negative'
                        }
                    ],
                    selected: 'positive'
                },
                effort: {
                    button_effort: [
                        {
                            title: 'Không nỗ lực',
                            key: 'no-effort'
                        },
                        {
                            title: 'Thiếu nỗ lực',
                            key: 'less-effort'
                        },
                        {
                            title: 'Có nỗ lực',
                            key: 'effort'
                        },
                        {
                            title: 'Rất nỗ lực',
                            key: 'very-effort'
                        }
                    ],
                    staff: 'no-effort'
                },
                efficiency: {
                    button_efficiency: [
                        {
                            title: 'Kém',
                            key: 'weak'
                        },
                        {
                            title: 'Chưa tốt',
                            key: 'not-good'
                        },
                        {
                            title: 'Tốt',
                            key: 'good'
                        },
                        {
                            title: 'Rất tốt',
                            key: 'very-good'
                        }
                    ],
                    selection: 'weak'
                },
                text: null,
                log_id: '',
                send: null
            },
            hidden: true,
            show_popup: '',
            show_problem: '',
            feature: false,
            is_evaluated: null,
            conversation: []
        }
    },
    methods: {
        imgSrc(name) {
            return '/img/feedback/' + name
        },
        async getFeedback(type = 'me') {
            this.tab.type = type
            let res = await this.$api({
                url: '/feed-back-log',
                method: 'POST',
                data: {
                    period_id: 1,
                    type: type
                }
            })

            if (res.success) {
                this.tab.data = res.object.map(item => {
                    return {
                        ...item,
                        schedule_time: moment(item.created_at).format('DD-MM-YYYY')
                    }
                })
            }
        },
        async openDetail(item) {
            let { is_evaluated } = item
            let type = this.tab.type

            let res = await this.$api({
                url: '/feed-back-detail',
                method: 'POST',
                data: {
                    object_log_id: item.object_log_id
                }
            })

            if (res.error) return this.$toast.error(res.message)

            this.hidden = false
            this.tab.object_info = res.object_info
            this.tab.list_detail = res.kr_log
            this.tab.user_checkin = res.user_checkin
            this.tab.user_response = res.user_response
            this.tab.log_id = item.object_log_id
            this.is_evaluated = item.is_evaluated
            this.conversation = res.conversation

            if (res.object_response) {
                this.tab.object_response = res.object_response
            }

            if (!is_evaluated && type == 'with_me') return (this.feature = true)
            return (this.feature = false)
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
            let confidence_text = this.tab.button_data.find(x => x.key == confidence_level)?.title || ''
            let progress_text = this.tab.button_slow.find(x => x.key == progress_speed)?.title || ''
            return `${confidence_text} - ${progress_text}`
        },
        async openEvaluate() {
            let res = await this.$api({
                url: '/evaluated-detail',
                method: 'POST',
                data: {
                    object_log_id: this.tab.log_id,
                    type_response: this.tab.feedback.selected,
                    emp_effort: this.tab.effort.staff,
                    emp_performance: this.tab.efficiency.selection,
                    content: this.tab.text
                }
            })
            if (res.error) return this.$toast.error(res.message)
            this.feature = false
        },
        format(item) {
            let { type_response, emp_effort, emp_performance } = item

            let confidence_text = this.tab.feedback.button_response.find(x => x.key == type_response)?.title || ''
            let progress_text = this.tab.effort.button_effort.find(x => x.key == emp_effort)?.title || ''
            let progress_selection = this.tab.efficiency.button_efficiency.find(x => x.key == emp_performance)?.title || ''

            return `${confidence_text} - ${progress_text} - ${progress_selection}`
        },
        async onEnter() {
            let res = await this.$api({
                url: '/conversation',
                method: 'POST',
                data: {
                    object_log_id: this.tab.log_id,
                    send: this.tab.send
                }
            })
            if (res.error) return this.$toast.error(res.message)

            let new_conversation = {
                send: this.tab.send
            }
            this.conversation.push(new_conversation)
            this.tab.send = null
        }
    },
    mounted() {
        this.getFeedback()
    }
}
</script>

<style lang="scss">
.wrap {
    padding: 20px 40px;
    width: 100%;
    height: 100%;

    &-feeback {
        background: #fff;
        height: 100%;
        padding: 40px 45px;
        border-radius: 14px;
        overflow: auto;

        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 90px;

            &-left {
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
                    width: 240px;

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

            &-right {
                display: flex;
                align-items: center;
                gap: 10px;

                &-canader {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    height: 44px;
                    padding: 10px;
                    cursor: pointer;
                }

                &-search {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    height: 44px;
                    padding: 10px;
                    width: 300px;
                }
            }
        }

        &-body {
            display: flex;
            flex-direction: column;
            gap: 20px;

            .detail {
                color: #000;
                border: 1px solid #308ce8;
                background: #fff;
                font-family: Medium;
                color: #308ce8;
            }
            .dash {
                border: 1px solid #e5e5e5;
                width: 100%;
                margin-top: 30px;
                margin-bottom: 25px;
            }
        }
    }
}
.wrap-list-detail {
    display: flex;
    width: 100%;
    height: 100%;

    &-left {
        width: 560px;
        height: 100%;
        background: #fff;
        position: relative;

        &-body {
            overflow: auto;
            height: 75%;
            padding: 0 35px;

            .tab-xanh {
                width: 395px;
                height: 80px;
                background: #449cf4;
                border-radius: 12px;
                padding: 11px 16px;
            }
            .tab-trang {
                width: 395px;
                background: #eaeaea;
                border-radius: 12px;
                padding: 11px 16px;
            }
        }

        &-footer {
            position: absolute;
            bottom: 26px;
            display: flex;
            justify-content: space-between;
            width: 88%;
            height: 55px;
            border: 1px solid #449cf4;
            border-radius: 8px;
            padding: 10px;

            input {
                width: 100%;
            }
        }
    }

    &-right {
        width: calc(100% - 560px);
        height: 100%;

        &-header {
            padding: 40px 50px;

            .percent {
                width: 100%;
                height: 6px;
                border-radius: 5px;
                background: #e0e0e0;

                &-ccc {
                    height: 6px;
                    border-radius: 5px;
                }
            }
        }
        .thengang {
            border: 1px solid #e0e0e0;
            width: 100%;
        }

        &-body {
            padding: 30px 55px;

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
    }
}
.wrap-evaluated-left {
    width: 560px;
    height: 100%;
    background: #fff;
    padding: 25px 35px;
    position: relative;

    .buttom-xam {
        border: 1px solid #ccc;
        border-radius: 6px;
        color: #7f7f7f;
        font-family: Bold;
        background: #fff;
        width: 24%;
    }
    .bgr {
        border: 1px solid #0677e8;
        color: #1781ea;
    }

    .textarea-id {
        width: 100%;
        height: 155px;
        border: 1px solid #ccc;
        border-radius: 6px;
        padding: 10px;
    }
    .send {
        width: 87%;
        border-radius: 6px;
        position: absolute;
        bottom: 28px;
    }
}
</style>
