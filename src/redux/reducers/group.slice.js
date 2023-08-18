import { createSlice } from '@reduxjs/toolkit';

const initialState = {
       myGroups: [], 
       allGroups: [], 
       allCategories:[],
       allSectionVideos:[],
       categoryVideos:[],
       categorySubjects:[],
       subjectChapters:[],
       presentSubject:{},
       selectedAudioId:null,
       presentOpenMenu:null,
       requestedSection:null,
       allChapterLessons:[],
       nextUpVideo:null,
       lastWatchedVideo:null,
       publicGroups: [], 
       privateGroups: [],
       groupMembers: [], 
       employeer: {}, 
       message: '',
      isLoading: false,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    saveMyGroup: (state, action) => {
        state.myGroups = action.payload;
    },
    saveAllGroup: (state, action) => {
        state.allGroups = action.payload;
    },
    setRequestedSection: (state, action) => {
      state.requestedSection = action.payload;
   },
    saveSectionVideos: (state, action) => {
      state.allSectionVideos = action.payload;
  },

saveCategoryVideos: (state, action) => {
  state.categoryVideos = action.payload;
},
saveCategorySubjects: (state, action) => {
  state.categorySubjects = action.payload;
},
savePresentSubject: (state, action) => {
  state.presentSubject = action.payload;
},
saveSubjectChapters: (state, action) => {
  state.subjectChapters = action.payload;
},
saveAllChapterLessons: (state, action) => {
  state.allChapterLessons = action.payload;
},
savePresentOpenMenu: (state, action) => {
  state.presentOpenMenu = action.payload;
},
  saveCategories: (state, action) => {
    state.allCategories = action.payload;
},
saveNextUpVideo: (state, action) => {
  state.nextUpVideo = action.payload;
},
savelastWatchedVideo: (state, action) => {
  state.lastWatchedVideo = action.payload;
},
    savePublicGroup: (state, action) => {
        state.publicGroups = action.payload;
    },
    savePrivateGroup: (state, action) => {
        state.privateGroups = action.payload;
    },
    saveGroupMembers: (state, action) => {
      state.groupMembers = action.payload;
  },
  saveSelectedAudioId: (state, action) => {
    state.selectedAudioId = action.payload;
},
    saveEmployeer: (state, action) => {
      state.employeer = action.payload;
  },
    isItLoading: (state, action) => {
      state.isLoading = action.payload;
  },
    clearGroup: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = groupSlice;

export const {
 saveMyGroup,
 saveAllGroup,
 saveSectionVideos,
 saveCategoryVideos,
 saveCategorySubjects,
 saveSubjectChapters,
 saveAllChapterLessons,
 saveNextUpVideo,
 savePresentOpenMenu,
 savePresentSubject,
 savePublicGroup,
 saveCategories,
 saveSelectedAudioId,
 savelastWatchedVideo,
 savePrivateGroup,
 saveGroupMembers,
 saveEmployeer,
 setRequestedSection,
 isItLoading,
 clearGroup
} = actions;

export default reducer;


