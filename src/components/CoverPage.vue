<template>
  <section class="cover" :style="coverStyleObject">
    <div
      class="cover__overlay"
      :style="overlayStyleObject"
      v-show="coverStyleObject.background !== 'none'"
    ></div>
    <div class="cover__title" :style="titleStyleObject">
      <h1 class="heading-one" :class="headingClassObject">
        {{ page.fields.title }}
      </h1>
      <span>Written by {{ authorName }}</span>
    </div>
    <div
      class="cover__right-img"
      v-show="this.page.fields.coverImagePositioning === 'Right Aligned'"
      :style="rightImgStyleObject"
    ></div>
  </section>
</template>

<script>
export default {
  name: 'CoverPage',
  props: {
    page: {
      type: Object,
      required: true
    },
    authorName: {
      type: String,
      required: true
    }
  },
  computed: {
    overlayStyleObject() {
      let opacity = 0.15;

      if (this.page.fields.imageOverlayOpacity !== null) {
        opacity = this.page.fields.imageOverlayOpacity;
      }

      return {
        backgroundColor: `rgba(0,0,0,${opacity})`
      };
    },
    titleStyleObject() {
      let textAlignment = 'left';
      const titleTextAlignVal = this.page.fields.titleTextAlignment.toLowerCase();

      if (titleTextAlignVal.includes('left')) {
        textAlignment = 'left';
      } else if (titleTextAlignVal.includes('center')) {
        textAlignment = 'center';
      } else {
        textAlignment = 'right';
      }

      return {
        textAlign: textAlignment
      };
    },
    coverStyleObject() {
      let flexAlign = 'flex-start';
      let backgroundImg = '';

      if (this.titleStyleObject.textAlign === 'center') {
        flexAlign = 'center';
      } else if (this.titleStyleObject.textAlign === 'right') {
        flexAlign = 'flex-end';
      }

      if (
        this.page.fields.coverImagePositioning.toLowerCase() === 'full cover'
      ) {
        backgroundImg = `#FFFFFF url('https:${
          this.page.fields.coverImage.fields.file.url
        }') center / 100% no-repeat`;
      }

      return {
        'justify-content': flexAlign,
        background: backgroundImg.length ? backgroundImg : 'none',
        color: backgroundImg.length ? '#F2F2F2' : '#333'
      };
    },
    rightImgStyleObject() {
      return {
        background: `#FFFFFF url('https:${
          this.page.fields.coverImage.fields.file.url
        }') center / 100% no-repeat`
      };
    },
    headingClassObject() {
      return {
        'heading-one--center': this.titleStyleObject.textAlign === 'center',
        'heading-one--right': this.titleStyleObject.textAlign === 'right'
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.cover {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;

  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__title {
    position: relative;
    padding: 10rem;
    z-index: 1;

    h1 {
      position: relative;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      &:after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 25%;
        height: 4px;
        background-color: $orange;
      }

      &.heading-one {
        &--center {
          padding-bottom: 0;
          &:after {
            position: static;
            margin: 0.5rem auto 0;
          }
        }
        &--right {
          &:after {
            right: 0;
            left: auto;
          }
        }
      }
    }

    span {
      text-transform: uppercase;
      font-weight: $medium;
      font-family: $secondary-font;
      letter-spacing: 0.01em;
      line-height: 2.3rem;
    }
  }

  &__right-img {
    flex: 1 1 30%;
    height: 100%;
  }
}
</style>
