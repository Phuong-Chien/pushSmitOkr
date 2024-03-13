<template>
    <div class="wrap-okr-header" v-if="!hidenn">
        <div class="wrap-okr-header-name">Chọn mục tiêu để check-in</div>
        <div class="wrap-okr-header-square">
            <label class="wrap-okr-header-square-month">
                <img :src="imgSrc('moment.svg')" alt="" />
                abc
            </label>
            <!-- <Status :options="['Đã check in nháp', 'Chờ tổng kết', 'Tất cả']" :default="'Tất cả'" /> -->
            <div class="wrap-okr-header-square-status">
                <div class="popup-class selected" @click="clickpageAccount('open')">
                    <div class="flexxxx">
                        Trạng thái:
                        <div style="font-family: Bold">{{ name }}</div>
                    </div>
                    <img :src="imgSrc('arrow.svg')" alt="" />
                </div>
                <div class="items" v-if="open">
                    <div v-for="(option, i) of options" :key="i" class="items-name" @click="abc(option)">
                        {{ option.title }}
                    </div>
                </div>
            </div>
            <div class="wrap-okr-header-square-input">
                <img :src="imgSrc('search.svg')" alt="" />
                <input type="text" placeholder="Tìm kiếm mục tiêu..." v-model="search" />
            </div>
        </div>
    </div>
    <div class="wrap-okr-body" v-if="!hidenn">
        <table style="width: 100%" id="data">
            <thead style="height: 34px; background: rgba(200, 231, 241, 0.4)">
                <th class="wrap-okr-body-name" style="padding: 0 30px">Tên mục tiêu</th>
                <th class="wrap-okr-body-name">Tiến độ</th>
                <th class="wrap-okr-body-name">Check in kỳ sau</th>
                <th class="wrap-okr-body-name">Người tham gia</th>
                <th class="wrap-okr-body-name">Trạng thái</th>
                <th class="wrap-okr-body-name">Hành động</th>
            </thead>
            <tbody>
                <tr v-for="(item, index) in updatingData" :key="index">
                    <td class="body-name">{{ item.object }}</td>
                    <td>
                        <div class="quantity">
                            <div>{{ item.percent_obj }}%</div>
                            <div class="quantity-grey">
                                <div class="quantity-grey-green" :style="[{ width: item.percent_obj + '%' }, { background: item.percent_obj >= 80 ? '#27AE60' : item.percent_obj >= 31 ? '#F2C94C' : '#EB5757' }]"></div>
                            </div>
                        </div>
                    </td>
                    <td>{{ item.schedule_time }}</td>
                    <td>
                        <div class="flex-center">
                            <img class="flex-center-img" :src="item.owner_avatar" alt="" />
                            <div v-if="item.participant_id === null" class="flex-center-csss" @click="openCheckin(index)">
                                <img class="flex-center-img" :src="item.participants[0].avatar" alt="" />
                                <img :src="imgSrc('arrow.svg')" alt="" />
                            </div>
                            <div v-else>
                                <img class="flex-center-img" :src="item.selected_parti.avatar" alt="" />
                            </div>
                            <!-- popup -->
                            <div class="flex-center-popup" v-if="openPopup === index">
                                <label v-for="(item, index) in item.participants" :key="index" class="flex-center-popup-render">
                                    <div class="flex-alignt" style="gap: 6px">
                                        <img class="flex-center-popup-render-img" :src="item.avatar" alt="" />
                                        {{ item.name }}
                                    </div>
                                    <input type="radio" :value="item.id" v-model="selected" />
                                </label>
                                <button style="margin-top: 5px; width: 100%" @click="confirm(item)" :disabled="selected.length < 1">Xác nhận</button>
                            </div>
                        </div>
                        <div class="abc" v-if="hidden" @click.self="hidden = false">
                            <div class="abc-white">
                                <div>
                                    <div style="font-family: Bold">Xác nhận người check in</div>
                                    <div style="font-family: Medium; width: 270px">Bạn sẽ không thể đổi người check-in cho mục tiêu này</div>
                                </div>
                                <button @click="acceptOkr">Xác nhận</button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div v-if="item.status === 'wait-next'">Chờ check-in kỳ tiếp theo</div>
                        <div v-else-if="item.status === 'draft'" class="flex-alignt">
                            <img :src="imgSrc('tichxanh.svg')" alt="" />
                            Đã check-in nháp
                        </div>
                        <div v-else-if="item.status === 'wait-final'" class="flex-alignt">
                            <img :src="imgSrc('mattroi.svg')" alt="" />
                            Chờ tổng kết
                        </div>
                        <div v-else style="color: #ccc">Chưa có</div>
                    </td>
                    <td>
                        <div class="flex">
                            <button class="flex-summary" v-if="item.status === 'wait-final' || item.percent_obj === '100'">Tổng kết</button>
                            <button class="flex-checkin" v-else :disabled="item.participant_id === null" @click="toggleCheckin(item)">Check-in</button>
                            <img :src="imgSrc('chart.svg')" alt="" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="hidenn" style="display: flex; height: 100%">
        <CheckinOkr :id="okr" @close="hidenn = false" :avatar="avatar" />
    </div>
</template>

<script>
import Status from '../components/Status.vue'
import CheckinOkr from '../components/CheckinOkr.vue'
// import 'animate.css'
import moment from 'moment'
export default {
    components: {
        Status,
        CheckinOkr
    },
    data() {
        return {
            data: [],
            search: '',
            openPopup: '',
            hidden: false,
            selected: [],
            object_id: null,
            hidenn: '',
            okr: null,
            avatar: null,
            options: [
                {
                    title: 'Đã check in nháp'
                },
                {
                    title: 'Chờ tổng kết'
                },
                {
                    title: 'Chờ check in kỳ tiếp theo'
                },
                {
                    title: 'Tất cả'
                }
            ],
            name: 'Tất cả',
            open: false
        }
    },
    methods: {
        imgSrc(name) {
            return '/img/check-in/' + name
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
                this.data = res.data.map(item => {
                    let selected_parti = item.participants.find(x => x.id === item.participant_id) // chuyen doi tu mang sang obj de lay avatar

                    return {
                        ...item,
                        schedule_time: moment(item.schedule_time).format('DD-MM-YYYY'),
                        selected_parti
                    }
                })
                return
            }
        },
        openCheckin(index) {
            this.openPopup = index

            if (this.openPopup) {
                window.addEventListener('click', this.closeMix)
            }
        },
        closeMix(event) {
            if (event.target.closest('.flex-center-csss') === null && !event.target.closest('.flex-center-popup')) {
                this.openPopup = false
                window.removeEventListener('click', this.closeMix)
            }
        },
        confirm(item) {
            this.hidden = true
            this.openPopup = false
            this.object_id = item.object_id
        },
        async acceptOkr() {
            let res = await this.$api({
                url: '/accept-participant',
                method: 'POST',
                data: {
                    object_id: this.object_id,
                    participant_id: this.selected
                }
            })
            this.hidden = false

            let index = this.nameSearch.findIndex(e => e.object_id == this.object_id)

            if (index > -1) {
                this.nameSearch[index]['participant_id'] = this.selected
                return
            }
        },
        toggleCheckin(item) {
            this.hidenn = true
            this.okr = item.object_id
            this.avatar = item.owner_avatar
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
        abc(option) {
            this.name = option.title
        }
    },
    created() {
        this.getListOkr()
    },

    computed: {
        nameSearch() {
            return this.data.filter(item => item.object.includes(this.search))
        },
        updatingData() {
            return this.nameSearch.filter(item => {
                if (this.name == 'Tất cả') {
                    return []
                } else if (this.name == 'Đã check in nháp') {
                    return item.status === 'draft'
                } else if (this.name == 'Chờ tổng kết') {
                    return item.status === 'wait-final'
                } else if (this.name == 'Chờ check in kỳ tiếp theo') {
                    return item.status === 'wait-next'
                }
            })
        }
    }
}
</script>

<style lang="scss">
.wrap-okr-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;

    &-name {
        color: #000;
        font-family: Bold;
        font-size: 24px;
        line-height: normal;
    }

    &-square {
        display: flex;
        gap: 10px;

        &-month {
            display: inline-flex;
            padding: 9px 10px;
            align-items: center;
            gap: 3px;
            border-radius: 10px;
            background: #fff;
            cursor: pointer;
            font-family: Medium;
        }

        &-status {
            display: inline-flex;
            padding: 9px 10px;
            align-items: center;
            gap: 3px;
            border-radius: 10px;
            background: #fff;
            cursor: pointer;
            font-family: Medium;
            position: relative;

            .selected {
                display: flex;
                align-items: center;

                .flexxxx {
                    display: flex;
                    gap: 6px;
                }
            }

            .items {
                color: #000;
                border-radius: 0px 0px 6px 6px;
                overflow: hidden;
                position: absolute;
                background-color: #fff;
                top: 55px;
                left: 0;
                right: 0;
                z-index: 1;
                border-radius: 10px;
                padding: 10px;
                // width: 100%;

                &-name {
                    color: #333;
                    padding-left: 1em;
                    cursor: pointer;
                    font-family: Bold;
                    user-select: none;
                    transition: all 0.2s;
                    border-radius: 8px;
                    padding: 10px;

                    &:hover {
                        background: #e0e0e0;
                    }
                }
            }
        }

        &-input {
            display: flex;
            width: 231px;
            padding: 8px 10px;
            align-items: center;
            gap: 3px;
            border-radius: 5px;
            border: 1px solid #e0e0e0;

            input {
                color: #828282;
                border: none;
                outline: none;
                background: #f0fbff;
            }
        }
    }
}

.wrap-okr-body {
    width: 100%;
    height: calc(100% - 89px);
    position: relative;

    &-name {
        color: #2d9cdb;
        font-family: Bold;
        text-align: left;
    }

    .quantity {
        display: flex;
        align-items: center;
        gap: 6px;

        &-grey {
            width: 121px;
            height: 6px;
            border-radius: 5px;
            background: #e0e0e0;

            &-green {
                height: 6px;
                border-radius: 5px;
            }
        }
    }

    .body-name {
        color: #000;
        padding: 0 30px;
    }

    .flex {
        display: flex;
        gap: 10px;
        align-items: center;

        &-checkin {
            display: flex;
            padding: 6px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            border-radius: 5px;
            border: 1px solid #2d9cdb;
            background: #fff;
            color: #2d9cdb;
            font-family: Bold;

            &:hover {
                background: #efeff2;
            }
        }

        &-summary {
            border-radius: 6px;
            background: #fff;
            border: 1px solid #00bf00;
            color: #26af69;
        }
    }
    #data {
        border-collapse: collapse;
    }

    tr {
        height: 80px;
    }

    tr:nth-child(odd) {
        width: 100%;
        // height: 80px;
        flex-shrink: 0;
        background: rgba(255, 255, 255, 0.72);
    }

    .flex-center {
        display: flex;
        align-items: center;
        gap: 7px;
        position: relative;

        &-img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
        }

        &-csss {
            width: 66px;
            height: 33px;
            flex-shrink: 0;
            border-radius: 50px;
            border: 1px solid #bdbdbd;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: space-around;
            cursor: pointer;
        }

        &-popup {
            width: 200px;
            padding: 10px;
            border-radius: 10px;
            background: #fff;
            position: absolute;
            top: 40px;
            left: 0;
            z-index: 99;

            &-render {
                padding: 9px 10px;
                border-radius: 10px;
                color: #333;
                font-family: Bold;
                display: flex;
                justify-content: space-between;

                &:hover {
                    background: #f2f2f2;
                    cursor: pointer;
                }

                &-img {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                }
            }
        }
    }
    .abc {
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
        }
    }
}
</style>
