import { createSlice } from '@reduxjs/toolkit';

const initialState = {
       myGroups: [], 
       allGroups: [], 
       allCategories:[],
       allSectionVideos:[],
       categoryVideos:[],
       categorySubjects:[],
       chosenQuiz:{},
       subjectChapters:[],
       presentSubject:{},
       selectedAudioId:null,
       teachers: [],
       selectedAudio:null,
       selectedAudioState:false,
       presentOpenMenu:null,
       currentQuizDetailsAndAnswers:null,
       submittingSingleAnswer:false,
       presentQuizQuestion:null,
       allQuizzesForSubject:[],
       requestedSection:null,
       allChapterLessons:[],
       nextUpVideo:null,
       lastWatchedVideo:null,
       openQuestionIndex:0,
       currentQuestionIndex:0,
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
fetchTeachers: (state, action) => {
  state.teachers = action.payload;
  state.error = '';
  state.message = '';
},
saveSubjectChapters: (state, action) => {
  state.subjectChapters = action.payload;
},
saveAllChapterLessons: (state, action) => {
  state.allChapterLessons = action.payload;
},
saveAllQuizzesForSubject: (state, action) => {
  state.allQuizzesForSubject = action.payload;
},
savePresentOpenMenu: (state, action) => {
  state.presentOpenMenu = action.payload;
},
saveOpenQuestionIndex: (state, action) => {
  state.openQuestionIndex = action.payload;
},
saveCurrentQuestionIndex: (state, action) => {
  state.currentQuestionIndex = action.payload;
},
savePresentQuizQuestion: (state, action) => {
  state.presentQuizQuestion = action.payload;
},
saveCurrentQuizDetailsAndAnswers: (state, action)=>{
  state.currentQuizDetailsAndAnswers = action.payload;
},
saveSubmittingSingleAnswer: (state, action)=>{
  state.submittingSingleAnswer = action.payload;
},

saveChosenQuiz: (state, action) => {
  state.chosenQuiz = action.payload;
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
saveSelectedAudio: (state, action) => {
  state.selectedAudio = action.payload;
  state.selectedAudioState = true 
},

saveSelectedAudioState: (state, action) => {
  state.selectedAudioState = action.payload;
 
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
 fetchTeachers,
 saveAllGroup,
 saveSectionVideos,
 saveCategoryVideos,
 saveCategorySubjects,
 saveSubjectChapters,
 saveAllChapterLessons,
 saveAllQuizzesForSubject,
 saveCurrentQuizDetailsAndAnswers,
 saveSubmittingSingleAnswer,
 saveNextUpVideo,
 saveOpenQuestionIndex,
 saveCurrentQuestionIndex,
 savePresentOpenMenu,
 savePresentQuizQuestion,
 savePresentSubject,
 savePublicGroup,
 saveCategories,
 saveChosenQuiz,
 saveSelectedAudioId,
 saveSelectedAudio,
 saveSelectedAudioState,
 savelastWatchedVideo,
 savePrivateGroup,
 saveGroupMembers,
 saveEmployeer,
 setRequestedSection,
 isItLoading,
 clearGroup
} = actions;

export default reducer;


