<template>
  <div>
    <Popup
      v-show="showP"
      @hidePopup="hidePopup"
      :popupName="popupName"
      :planItem="planItem"
    />

    <TheHeader @showPopup="showPopup" />
    <TheMain />

    <div class="btn-float">
      <button class="btn-main" @click="floatBtn()">
        <svg class="plus-icon">
          <use xlink:href="@/assets/sprite.svg#icon-plus"></use>
        </svg>
      </button>

      <ul>
        <li class="add-task" @click="showPopup('new-task')">
          <svg class="pen-icon">
            <use xlink:href="@/assets/sprite.svg#icon-pen-angled"></use>
          </svg>
          <span class="tootlip"> New Task </span>
        </li>

        <li class="add-plan" @click="showPopup('new-plan')">
          <svg class="notification-icon">
            <use
              xlink:href="@/assets/sprite.svg#icon-notifications-outline"
            ></use>
          </svg>
          <span class="tootlip"> New Plan </span>
        </li>

        <li class="add-cat" @click="showPopup('new-cat')">
          <svg class="folder-icon">
            <use xlink:href="@/assets/sprite.svg#icon-folder-outline"></use>
          </svg>
          <span class="tootlip"> New Category </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import TheHeader from "../components/layouts/TheHeader.vue";

import TheMain from "../components/layouts/TheMain.vue";

import Popup from "../components/popup.vue";

const {
  GetToday,
  getfirstLast,
  getDatesBetween,
} = require("../services/getToday");

export default {
  name : "HomeView",
  data() {
    return {
      showP: false,
      planItem: null,
      content: "",
      dateValue: null,
      tasks: [],
      popupName: null,
    };
  },
  components: {
    TheHeader,
    TheMain,
    Popup,
  },
  methods: {
    showPopup(name) {
      this.showP = true;
      this.popupName = name;
    },
    hidePopup() {
      this.showP = false;
      this.planItem = null;
      this.popupName = null;
    },
    async showPlanPopup(id) {
      this.planItem = await this.$store.dispatch("todo/getSinglePlan", id);
      this.showP = true;
    },
    
    floatBtn() {
      if (
        document.querySelector(".btn-main svg").classList.contains("plus-icon")
      ) {
        document.querySelector(".add-task").style.transform =
          "translateY(-50px)";
        document.querySelector(".add-plan").style.transform =
          "translateY(-100px)";
        document.querySelector(".add-cat").style.transform =
          "translateY(-150px)";
        document.querySelectorAll(".btn-float li").forEach((li) => {
          li.classList.add("active");
        });

        document.querySelector(".btn-main").innerHTML =
          '<svg class="close-icon" @click="closefloatBtn"><use xlink:href="/img/sprite.35a48fe3.svg#icon-close"></use></svg>';
      } else {
        document.querySelector(".add-task").style.transform = "translateY(0)";
        document.querySelector(".add-plan").style.transform = "translateY(0)";
        document.querySelector(".add-cat").style.transform = "translateY(0)";

        document.querySelector(".btn-main").innerHTML =
          '<svg class="plus-icon" @click="closefloatBtn"><use xlink:href="/img/sprite.35a48fe3.svg#icon-plus"></use></svg>';
      }
    },
  },

  provide(){
    return{
      showPopup : this.showPopup,
      hidePopup : this.hidePopup,
      showPlanPopup : this.showPlanPopup
    }
  },

  mounted() {
    this.dateValue = GetToday(); // log => 2023-12-10
    this.$store.dispatch("todo/getTasksbyDate", this.dateValue);
    this.$store.dispatch("todo/getCategories");

    let dates = getDatesBetween(
      getfirstLast().firstDayWeek,
      getfirstLast().lastDayWeek
    );

    this.$store.dispatch("todo/addPlans", dates);
  },
};
</script>

<style lang="scss">
.btn-float {
  position: fixed;
  right: 4rem;
  bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  button,
  li {
    height: 4.5rem;
    width: 4.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-main {
    background-color: $color-primary;
    font-size: 2rem;
    color: white;
    z-index: 10;
    box-shadow: 0 0.4rem 0.7rem rgba(#000, 0.2);
    border: 1px solid #2e86de;
    cursor: pointer;

    .plus-icon {
      width: 2.5rem;
      height: 2.5rem;
    }
  }

  svg {
    fill: white;
    width: 2rem;
    height: 2rem;
  }

  ul {
    li {
      position: absolute;
      left: 0;
      bottom: 0;
      transition: 0.3s all cubic-bezier(0.02, 0.99, 1, 0.9);
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      height: auto;

      &:hover > .tootlip {
        overflow: auto; /* Hide the element content, while height = 0 */
        height: auto;
        opacity: 1;
      }

      &.active {
        opacity: 1;
        visibility: visible;
        height: 4.5rem;
      }
    }
  }
}

.add-task {
  background-color: #ff9f43;
  border: 1px solid #ff6b6b;
  z-index: 2;
}

.add-plan {
  background-color: blueviolet;
  border: 1px solid #341f97;
  z-index: 1;
}

.add-cat {
  background-color: #2f3542;
  border: 1px solid #000;
  z-index: 0;
}

.tootlip {
  background-color: #2f3640;
  letter-spacing: 0.5px;
  font-size: 1.1rem;
  white-space: nowrap;
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  color: white;
  position: absolute;
  font-family: "Nunito", sans-serif;
  overflow: hidden; /* Hide the element content, while height = 0 */
  height: 0;
  opacity: 0;
  left: -7rem;
  transition: height ease;
  border: 1px solid #000;
}
</style>
