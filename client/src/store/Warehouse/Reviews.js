import axios from 'axios';
// import router from '../../router';

const state = {
    reviews: []
};

const getters = {
    reviews: state => {
        return state.reviews;
    }
};

const mutations = {
    get_reviews_request(state) {
        state.status = 'loading';
        state.error = null;
    },
    get_reviews_success(state, reviews) {   
        state.reviews = reviews;
        state.status = 'success';
        state.error = null;
    },
    get_reviews_error(state, err) {
        state.error = err.response.data.msg;
    },
    new_review_request(state) {
        state.status = 'loading';
        state.error = null;
    },
    new_review_success(state) {   
        // state.reviews = reviews;
        state.status = 'success';
        state.error = null;
    },
    new_review_error(state, err) {
        state.error = err.response.data.msg;
    },
    remove_review_request(state) {
        state.status = 'loading';
        state.error = null;
    },
    remove_review_success(state) {
        state.status = 'success';
        state.error = null;
    },
    remove_review_error(state, err) {
        state.status = 'failed';
        state.status = err.response.msg;
    }
}

const actions = {
    async getReviews({commit}) {
        commit("get_reviews_request");
        try {
            let res = await axios.get('/api/reviews');
            if (res.data.success) {
                const reviews = res.data.reviews;
                commit('get_reviews_success', reviews);
            }
            return res;
        } catch(err) {
            commit('get_reviews_error', err);
        }
    },
    async createReview({commit}, review) {
        commit("new_review_request");
        try {
            let res = await axios.post('/api/reviews', {...review, date: new Date()} );
            if (res.data.success) {
                commit('new_review_success', res.data.review);
            }
            return res;

        } catch(err) {          
            commit('new_review_error', err);
            
        }
    },
    async removeReview({commit}, id) {
        commit('remove_review_request');
        console.log(id);
        let res = await axios.delete('/api/reviews', { data: { id } });
        try { 
            if (res.data.success) {
                commit('remove_review_success');
            }
            return res;

        } catch(err) {            
            commit('remove_review_error', err);
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}