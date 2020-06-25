<template>
    <div>
        <button 
            class="btn btn-primary d-flex mx-auto mb-3"
            @click="writingReview = true"
            v-if="!writingReview">
            Give a review
        </button>
        <div v-else class="row mt-1 mb-3">
            <div class="card mx-auto">
                <div class="card-header text-white bg-primary">
                    <h4>Your Review</h4>
                </div>
                <div class="card-body">
                    <form>
                        <!-- <div class="form-group">
                            <input 
                                    class="form-control"
                                    type="text" 
                                    id="title"
                                    placeholder="Title" 
                                    name="title"
                                    v-model="title"/>
                        </div> -->
                        <div class="form-group">
                            <textarea class="form-control"
                                    type="text" 
                                    id="content"
                                    placeholder="Content..." 
                                    name="content"
                                    rows="5"
                                    v-model="content"></textarea>
                        </div>
                        <button @click="createReview({title, content})" class="btn btn-primary">Post</button>
                        <button @click="writingReview=false" class="btn btn-primary mx-2">Cancel</button>
                        
                    </form>
                </div>
            </div>
        </div>
        <div class="row " v-if="reviews">
            <div class="col-12" v-for="review in reviews" :key="review._id">
                <blockquote class="quote-card mx-auto navbar-bg">
                    <p>
                        {{ review.content }}
                    </p>
                    <cite>
                      {{ review.date | displayDate }}
                    </cite>
                    <cite>
                      {{ review.user.username }}
                    </cite>
                    <button
                        class="btn btn-sm btn-warning mt-2"
                        v-if="review.user._id == user._id"
                        @click="remove(review._id)">
                        Remove
                    </button>
                </blockquote>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            title: '',
            content: '',
            writingReview: false
        }
    },
    methods: {
        ...mapActions([
            'getReviews',
            'createReview',
            'removeReview',
            'getProfile'
        ]),
        async remove(id) {
            await this.removeReview(id);
            await this.getReviews();
        }
    },
    computed:{ 
        ...mapGetters([
            'authState',
            'reviews',
            'user'
        ])
    },
    filters: {
        displayDate(dateString) {
            let date = new Date(dateString);
            let weekdayAndMonth = date.toString().substring(0,7);
            return  weekdayAndMonth + ' ' + `${date.getDate()}` + ' ' + `${date.getFullYear()}`;
        }
    },
    async created() {
        await this.getProfile();
        await this.getReviews();
    }

}
</script>

<style scoped>
    .card {
        width: 60%;
        /* border-radius: 0; */
    }
    .btn {
        /* border-radius: 0; */
    }
    .form-control {
        /* border-radius: 0; */
    }

    .quote-card {
        /* background: #fff; */
        /* color: #222222; */
        color: white;
        /* margin: 0 auto; */
        padding: 20px;
        padding-left: 50px;
        box-sizing: border-box;
        box-shadow: 0 2px 4px rgba(34, 34, 34, 0.7);
        position: relative;
        overflow: hidden;
        min-height: 120px;
        width: 60%;
    }
    .quote-card p {
        font-size: 22px;
        line-height: 1.5;
        margin: 0;
        max-width: 80%;
    }
    .quote-card cite {
        font-size: 16px;
        margin-top: 10px;
        display: block;
        font-weight: 200;
        opacity: 0.8;
    }
    .quote-card:before {
        font-family: Georgia, serif;
        content: "“";
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 5em;
        color: rgba(238, 238, 238, 0.8);
        font-weight: normal;
    }
    .quote-card:after {
        font-family: Georgia, serif;
        content: "”";
        position: absolute;
        bottom: -110px;
        line-height: 100px;
        right: -32px;
        font-size: 25em;
        color: rgba(238, 238, 238, 0.8);
        font-weight: normal;
    }
    @media (max-width: 640px) {
        .quote-card:after {
                font-size: 22em;
                right: -25px;
        }
    }
</style>