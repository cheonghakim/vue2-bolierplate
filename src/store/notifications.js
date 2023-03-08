import Vue from "vue";

export const notifications = {
  state: () => ({
    runningEvtMessages: [],
    storedEvtMessages: [],
  }),
  getters: {
    currentNewNotis(state) {
      return state.storedEvtMessages?.length || 0;
    },
    allMessages(state) {
      return state.storedEvtMessages.map((item) => {
        if (item) {
          const replaced = item?.content?.replaceAll(/<br>|<br \/>/gi, "\n");
          item.changedContent = replaced;
          return item;
        }
      });
    },
  },

  mutations: {
    clearToastCommit(state) {
      state.runningEvtMessages = [];
      state.storedEvtMessages = [];
    },
    pushMsgCommit(state, payload) {
      state.runningEvtMessages?.push(payload);
    },
    showToastCommit(state) {
      while (state.runningEvtMessages?.length > 0) {
        const shifted = state.runningEvtMessages?.shift();
        Vue.prototype.$notify({
          group: "norification",
          title: shifted?.title || "제목",
          text: shifted?.content || "내용",
          duration: shifted?.duration || -1,
          width: shifted?.width || "500px",
          ignoreDuplicates: shifted?.ignoreDuplicates || false,
          reverse: shifted?.reverse || false,
          "animation-type": shifted?.animTp || "css",
          "animation-name": shifted?.animNm || null,
          speed: shifted?.speed || 300,
          data: {
            //나머지 데이터
            link: shifted?.link || "",
            variant: shifted?.variant || "success",
          },
        });
        state.storedEvtMessages.push(shifted);
      }
    },
    deleteEvtMsgCommit(state, { content, title }) {
      let index = -1;

      for (let i = 0; i < state.storedEvtMessages?.length; i++) {
        const item = state.storedEvtMessages[i];
        if (item.content === content && item.title === title) {
          index = i;
          break;
        }
      }

      if (index !== -1) state.storedEvtMessages?.splice(index, 1);
    },
  },

  actions: {
    pushMsg({ commit }, payload) {
      commit("pushMsgCommit", payload);
    },

    showToast({ commit }) {
      commit("showToastCommit");
    },
    clearToast({ commit }) {
      commit("clearToastCommit");
    },

    deleteEvtMsg({ commit }, payload) {
      commit("deleteEvtMsgCommit", payload);
    },
  },
};
