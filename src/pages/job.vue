<template>
    <div class="wrap-job">
        <div class="wrap-job-header flex-space">
            <div style="font-family: Bold">Công việc</div>
            <div class="flex-alignt" style="gap: 15px">
                <div class="wrap-job-header-square flex-alignt">
                    <img :src="imgSrc('log.svg')" alt="" />
                    Log
                </div>
                <div class="wrap-job-header-square flex-alignt">
                    <img :src="imgSrc('log.svg')" alt="" />
                    Muc tieu : Tat ca
                </div>
                <div class="wrap-job-header-square flex-alignt">
                    <img :src="imgSrc('lich.svg')" alt="" />
                    Kỳ check in: 20/03/2024
                </div>
                <button class="wrap-job-header-blue">Tạo công việc</button>
            </div>
        </div>
        <div class="wrap-job-body">
            <div class="flex-colum" style="gap: 10px">
                <div v-for="(item, index) in job.data" :key="index">
                    <div class="wrap-job-body-white flex-space">
                        <div class="flex-alignt">
                            <img :src="imgSrc('icon_tron.svg')" alt="" />
                            <div>: {{ item.object }}</div>
                        </div>
                        <div class="wrap-job-body-white-collapse flex-alignt" @click="openListKr(item, index)">
                            <img :src="imgSrc('icon.svg')" alt="" />
                            Chi tiết
                        </div>
                    </div>
                    <div class="square" v-if="job.kr === index">
                        <div class="flex-colum" style="gap: 10px">
                            <div class="square-width" v-for="(item, index) in job.list_kr" :key="index">
                                <div class="flex-space">
                                    <div class="flex-gap" style="gap: 20px">
                                        <img :src="imgSrc('muiten.svg')" alt="" style="cursor: pointer" @click="openListTask(item, index)" />
                                        <div class="flex-gap">
                                            <div class="kr flex-center">KR{{ index + 1 }}</div>
                                            <div>{{ item.key_results }}</div>
                                        </div>
                                    </div>
                                    <div class="flex-gap">
                                        <img :src="imgSrc('congviec.svg')" alt="" style="cursor: pointer" />
                                        <img :src="imgSrc('bacham.svg')" alt="" style="cursor: pointer" />
                                    </div>
                                </div>
                                <div class="square-width-body" v-if="job.hidden_task === index">
                                    <div class="square-width-body-header">
                                        <div class="name-header" style="min-width: 550px; padding-left: 40px">Công việc</div>
                                        <div class="name-header" style="min-width: 300px">Thời hạn</div>
                                        <div class="name-header" style="min-width: 100px"></div>
                                        <div class="name-header" style="min-width: 300px">Người theo dõi</div>
                                        <div class="name-header" style="min-width: 100px">Cấp độ</div>
                                        <div class="name-header">Trạng thái</div>
                                    </div>
                                    <!-- phan body task viec -->
                                    <draggable style="margin-top: 25px; cursor: pointer" item-key="index" ghost-class="ghost" drag-class="drag" v-model="job.list_task" @change="changeDrag">
                                        <template #item="{ element: item }">
                                            <div class="square-width-body-body">
                                                <div class="flex-gap" style="min-width: 550px; gap: 14px">
                                                    <img :src="imgSrc('ba_cham.svg')" alt="" />
                                                    {{ item.task_name }}
                                                </div>
                                                <div style="min-width: 300px">{{ item.start_time }} - {{ item.end_time }}</div>
                                                <i class="fa-solid fa-clock popup-class cursor" @click="clickpageAccount(item)">
                                                    <div class="popup-time" v-if="item.hidden_time">
                                                        <div class="popup-time-fff" @click.stop>
                                                            <div class="flex-alignt" style="gap: 6px; font-family: Bold; margin-bottom: 30px">
                                                                <img :src="imgSrc('dongho.svg')" alt="" />
                                                                Extend time
                                                            </div>
                                                            <div style="font-family: Bold">Task: {{ item.task_name }}</div>
                                                            <div class="popup-time-fff-increase">
                                                                <div class="flex-space" style="margin-left: 8px">
                                                                    <div class="flex-alignt" style="gap: 20px">
                                                                        <img :src="imgSrc('dautru.svg')" alt="" @click="onTime()" />
                                                                        {{ time.increase_time }}
                                                                        <img :src="imgSrc('daucong.svg')" alt="" @click="time.increase_time++" />
                                                                    </div>
                                                                    <div class="flex-alignt color">
                                                                        Ngày
                                                                        <img :src="imgSrc('muitenduoi.svg')" alt="" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style="color: #b2b2b2; font-family: Medium">Khi bạn tăng thêm thời hạn task này, các công việc đằng sau cũng sẽ tự động thăng thêm thời hạn</div>
                                                            <button class="popup-time-fff-button" @click="saveTime(item)">Tăng thời hạn</button>
                                                        </div>
                                                    </div>
                                                </i>
                                                <div style="min-width: 300px; position: relative">
                                                    <!-- phan nguoi theo doi -->
                                                    <div class="flex-alignt" style="gap: 6px" v-if="item.info_users.length === 1">
                                                        <img :src="item.info_users[0].avatar" alt="" style="width: 16px; height: 16px; border-radius: 50%" />
                                                        {{ item.info_users[0].name }}
                                                    </div>
                                                    <div class="flex-alignt" style="gap: 8px" v-else-if="item.info_users.length > 1">
                                                        <img :src="item.info_users[0].avatar" alt="" style="width: 16px; height: 16px; border-radius: 50%" />
                                                        {{ item.info_users[0].name }}
                                                        <div style="position: relative">
                                                            <div class="circle flex-center" tabindex="1" @blur="item.hidden_folow = false" @click="item.hidden_folow = true">
                                                                <p>+{{ item.info_users.length - 1 }}</p>
                                                            </div>
                                                            <div class="circle-bgr" v-if="item.hidden_folow">
                                                                <div class="flex-colum" style="gap: 10px">
                                                                    <div v-for="(item, index) in item.info_users" :key="index" class="flex-alignt" style="gap: 4px">
                                                                        <img :src="item.avatar" alt="" style="width: 16px; height: 16px; border-radius: 50%" />
                                                                        {{ item.name }}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex-alignt monitor" style="gap: 8px" @click="getListuser(item)" v-else>
                                                        Chọn người theo dõi
                                                        <img :src="imgSrc('muitenn.svg')" alt="" />
                                                    </div>
                                                    <!-- popup nguoi theo doi -->
                                                    <div class="absolute" v-if="item.hidden_popup_folow" @click.stop>
                                                        <div class="flex-colum" style="gap: 8px">
                                                            <label v-for="(item, index) in user.list_user" :key="index" class="absolute-render">
                                                                <div class="flex-alignt" style="gap: 6px">
                                                                    <img class="absolute-img" :src="item.avatar" alt="" style="width: 16px; height: 16px; border-radius: 50%" />
                                                                    {{ item.name }}
                                                                </div>
                                                                <input type="checkbox" :value="item.id" v-model="user.selected" />
                                                            </label>
                                                            <button style="margin-top: 5px; width: 100%" :disabled="user.selected.length < 1" @click="confirmData(item)">Xác nhận</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style="min-width: 100px">
                                                    {{ formatLevel() }}
                                                </div>
                                                <div style="position: relative; min-width: 100px">
                                                    <div class="status" tabindex="1" @blur="item.hidden_status = false" @click="item.hidden_status = true" v-if="item.task_status === null">Chọn status</div>
                                                    <div class="status" tabindex="1" @blur="item.hidden_status = false" @click="item.hidden_status = true" :style="[{ color: item.task_status === 'done' ? '#0ed10e' : item.task_status === 'doing' ? '#ffaa56' : '#ccc', border: `1px solid ${item.task_status === 'done' ? '#0ed10e' : item.task_status === 'doing' ? '#ffaa56' : '#ccc'}` }]" v-else>{{ item.task_status }}</div>
                                                    <div class="status-bgr flex-colum" style="gap: 10px" v-if="item.hidden_status">
                                                        <div v-for="(task, index) in task_status.options" :key="index" class="status-bgr-icon" @mousedown="openStatus(task, item)">
                                                            <div>{{ task.title }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex-alignt" style="margin-left: 22px; gap: 10px">
                                                    <i class="fa-solid fa-screwdriver-wrench"></i>
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </div>
                                            </div>
                                        </template>
                                    </draggable>
                                    <div style="border: 1px dashed #ccc; width: 100%"></div>
                                    <div style="margin: 25px 0; display: flex">
                                        <input type="text" placeholder="Điền tên task việc...." style="min-width: 550px" />
                                        <div class="flex-alignt" style="gap: 25px; min-width: 400px">
                                            <div class="flex-alignt canada">
                                                22.12.2024
                                                <img :src="imgSrc('lich.svg')" alt="" />
                                            </div>
                                            -
                                            <div class="flex-alignt canada">
                                                22.12.2024
                                                <img :src="imgSrc('lich.svg')" alt="" />
                                            </div>
                                        </div>
                                        <div style="min-width: 290px">
                                            <div class="flex-alignt folow" style="gap: 8px">
                                                Chọn người theo dõi
                                                <img :src="imgSrc('muitenn.svg')" alt="" />
                                            </div>
                                        </div>
                                        <div class="flex-alignt level" style="gap: 8px">
                                            P0
                                            <img :src="imgSrc('muitenn.svg')" alt="" />
                                        </div>
                                    </div>
                                    <div class="flex-alignt">
                                        <img src="" alt="" />
                                        Thêm công việc
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import moment from 'moment'
export default {
    components: {
        draggable
    },

    data() {
        return {
            job: {
                data: [],
                list_kr: [],
                kr: false,
                list_task: [],
                hidden_task: ''
            },
            object_id: null,
            user: {
                list_user: [],
                selected: []
            },
            level: {
                options: [
                    {
                        title: 'P0',
                        key: 'not-important'
                    },
                    {
                        title: 'P1',
                        key: 'important'
                    },
                    {
                        title: 'P2',
                        key: 'very-important'
                    }
                ]
            },
            task_status: {
                options: [
                    {
                        title: 'Doing',
                        key: 'doing'
                    },
                    {
                        title: 'Done',
                        key: 'done'
                    },
                    {
                        title: 'Not started',
                        key: 'not-started'
                    }
                ]
            },
            time: {
                increase_time: 0
            }
        }
    },
    methods: {
        imgSrc(name) {
            return '/img/job/' + name
        },
        async getListOkr() {
            let res = await this.$api({
                url: '/list-okr',
                method: 'POST',
                data: {
                    period_id: 1
                }
            })

            if (res.success) {
                this.job.data = res.data
            }
        },
        async openListKr(item, index) {
            let res = await this.$api({
                url: '/list-kr',
                method: 'POST',
                data: {
                    object_id: item.object_id
                }
            })
            this.job.list_kr = res.data_kr
            this.job.kr = index
            this.object_id = item.object_id
        },
        async openListTask(item, index) {
            let res = await this.$api({
                url: '/list-task',
                method: 'POST',
                data: {
                    object_id: this.object_id,
                    kr_id: item.id
                }
            })
            if (res.success) {
                this.job.list_task = res.data.map(item => {
                    return {
                        ...item,
                        start_time: moment(item.start_time).format('DD-MM-YYYY'),
                        end_time: moment(item.end_time).format('DD-MM-YYYY'),
                        hidden_folow: false,
                        hidden_popup_folow: false,
                        hidden_status: false,
                        hidden_time: false
                    }
                })
                this.job.hidden_task = index
            }
        },
        async getListuser(item) {
            let res = await this.$api({
                url: '/get-user',
                method: 'GET'
            })
            if (res.success) {
                this.user.list_user = res.list_user
                item.hidden_popup_folow = !item.hidden_popup_folow
                if (item.hidden_popup_folow) {
                    const closeFunction = event => {
                        if (!event.target.closest('.popup-class')) {
                            item.hidden_popup_folow = false
                            window.removeEventListener('click', closeFunction)
                        }
                    }
                    window.addEventListener('click', closeFunction)
                }
            }
        },
        async confirmData(item) {
            let res = await this.$api({
                url: '/update-participant',
                method: 'POST',
                data: {
                    object_id: item.object_id,
                    kr_id: item.kr_id,
                    task_id: item.task_id,
                    task_name: item.task_name,
                    participant_id: this.user.selected
                }
            })
            if (res.success) {
                this.$toast.success(res.message)
                item.info_users = this.user.selected.map(userId => {
                    return this.user.list_user.find(user => user.id === userId)
                })
                item.hidden_popup_folow = false
                this.user.selected = []
            } else {
                this.$toast.error(res.message)
            }
        },
        formatLevel() {
            let confidence_text = this.level.options.find(x => x.key)?.title || ''
            return `${confidence_text}`
        },
        async openStatus(task, item) {
            let res = await this.$api({
                url: '/update-status-task',
                method: 'POST',
                data: {
                    object_id: item.object_id,
                    kr_id: item.kr_id,
                    task_id: item.task_id,
                    task_name: item.task_name,
                    task_status: task.key
                }
            })
            if (res.success) {
                this.task_status.hidden_status = false
                this.$toast.success(res.message)
                item.task_status = task.key
            } else {
                this.$toast.error(res.message)
            }
        },
        async changeDrag(a) {
            let res = await this.$api({
                url: '/swap-drag',
                method: 'POST',
                data: {
                    object_id: a.moved.element.object_id,
                    kr_id: a.moved.element.kr_id,
                    task_id: a.moved.element.task_id,
                    old_index: a.moved.oldIndex,
                    new_index: a.moved.newIndex
                }
            })
            if (res.error) return this.$toast.error(res.message)
        },
        clickpageAccount(item) {
            item.hidden_time = !item.hidden_time
            if (item.hidden_time) {
                const closeFunction = event => {
                    if (!event.target.closest('.popup-class')) {
                        item.hidden_time = false
                        window.removeEventListener('click', closeFunction)
                    }
                }
                window.addEventListener('click', closeFunction)
            }
        },
        onTime() {
            if (this.time.increase_time > 0) {
                this.time.increase_time--
            }
        },
        async saveTime(item) {
            let res = await this.$api({
                url: '/extend-time',
                method: 'POST',
                data: {
                    object_id: item.object_id,
                    kr_id: item.kr_id,
                    task_name: item.task_name,
                    task_id: item.task_id,
                    index_drag: item.index_drag,
                    time: this.time.increase_time
                }
            })
            if (res.success) {
                this.$toast.success(res.message)
                item.hidden_time = false
            } else {
                this.$toast.error(res.message)
            }
        }
    },
    created() {
        this.getListOkr()
    }
}
</script>

<style lang="scss">
.wrap-job {
    height: 100%;

    &-header {
        padding: 25px;

        &-square {
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 8px;
            height: 44px;
            padding: 10px;
            font-family: Medium;
        }
        &-blue {
            width: 184px;
            border-radius: 6px;

            &:hover {
                background: #51ade3;
            }
        }
    }

    &-body {
        padding: 0 25px 30px 25px;
        overflow: auto;
        height: calc(100% - 94px);

        &-white {
            background: #fff;
            padding: 15px;
            border-radius: 10px;

            &-collapse {
                background: #efefef;
                padding: 3px;
                border-radius: 18px;
                width: 90px;
                font-family: semibold;
                justify-content: center;
                border: 1px solid #ccc;
                cursor: pointer;
            }
        }
        .square {
            margin-top: 10px;

            &-width {
                background: #fff;
                padding: 20px 15px;
                border-radius: 8px;

                .kr {
                    width: 36px;
                    height: 17px;
                    background: #a04ff7;
                    border-radius: 20px;
                    color: #fff;
                    font-family: Bold;
                }

                &-body {
                    &-header {
                        display: flex;
                        align-items: center;
                        margin-top: 35px;

                        .name-header {
                            color: #ccc;
                            font-family: Medium;
                        }
                    }

                    &-body {
                        display: flex;
                        align-items: center;
                        user-select: none;
                        height: 55px;

                        .circle {
                            border: 1px solid #ccc;
                            border-radius: 18px;
                            width: 30px;
                            height: 20px;
                            cursor: pointer;

                            &-bgr {
                                background: #fff;
                                border: 1px solid #ccc;
                                border-radius: 12px;
                                padding: 10px;
                                position: absolute;
                                z-index: 99;
                                width: 170px;
                                top: -66px;
                                left: 33px;
                            }
                        }

                        .monitor {
                            border: 1px solid #ccc;
                            border-radius: 16px;
                            height: 30px;
                            width: 170px;
                            padding: 10px;
                            cursor: pointer;
                        }

                        .absolute {
                            position: absolute;
                            background: #fff;
                            border: 1px solid #ccc;
                            border-radius: 12px;
                            top: 34px;
                            left: 0;
                            width: 170px;
                            padding: 10px;
                            z-index: 99;
                            overflow: auto;
                            height: 200px;

                            &-render {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                cursor: pointer;
                            }
                        }
                        .status {
                            border: 1px solid #ccc;
                            color: #ccc;
                            font-family: Medium;
                            border-radius: 8px;
                            padding: 4px;
                            cursor: pointer;
                            text-align: center;

                            &-bgr {
                                width: 100px;
                                background: #fff;
                                border-radius: 8px;
                                padding: 10px;
                                border: 1px solid #ccc;
                                z-index: 99;
                                position: absolute;
                                top: 30px;

                                &-icon {
                                    border: 1px solid #ccc;
                                    padding: 4px;
                                    border-radius: 6px;
                                    text-align: center;
                                    cursor: pointer;
                                }
                            }
                        }
                        .popup-time {
                            background-color: rgba(0, 0, 0, 0.3);
                            height: 100%;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            transition: all 0.2s;
                            position: absolute;
                            left: 0;
                            top: 0;
                            z-index: 100;

                            &-fff {
                                padding: 20px;
                                border-radius: 10px;
                                background: #fff;
                                width: 455px;
                                height: 265px;

                                &-increase {
                                    width: 100%;
                                    height: 50px;
                                    border: 1px solid #ccc;
                                    border-radius: 14px;
                                    margin: 10px 0;

                                    .color {
                                        width: 80px;
                                        height: 48px;
                                        background: #ccc;
                                        border-radius: 14px;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        font-family: Medium;
                                    }
                                }

                                &-button {
                                    width: 100%;
                                    margin-top: 20px;
                                }
                            }

                            .huy {
                                border: 1px solid #ccc;
                                color: #000;
                                background: #fff;
                                margin-top: -10px;
                            }
                        }
                    }
                }
                .canada {
                    width: 120px;
                    height: 32px;
                    border: 1px solid #ccc;
                    border-radius: 14px;
                    padding: 12px;
                }

                .folow {
                    border: 1px solid #ccc;
                    border-radius: 16px;
                    height: 30px;
                    width: 170px;
                    padding: 10px;
                    cursor: pointer;
                }
                .level {
                    border: 1px solid #ccc;
                    border-radius: 16px;
                    height: 30px;
                    padding: 10px;
                    cursor: pointer;
                }
            }
        }
    }

    .cursor {
        min-width: 100px;
        cursor: pointer;
    }
}
</style>
