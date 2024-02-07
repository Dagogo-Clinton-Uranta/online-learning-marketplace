#   Online Learning Web App

This app aimed at students ages 13-17.It serves as a study aid to supplement 
their traditional curriculum and provide access to those who struggle to find it.
It is done in React JS, makes use of firebase for authentication and data storage and makes use of amazon s3 for media storage.



## TO INSTALL 

 1.) Clone this repository into your preferred file (git clone -b main <THIS REPO'S URL>)\
 2.) Set up environment variables in a .env file (not included with this repository)\
 3.) run the install command with your package manager (e.g npm install)\

 
 ## TO START 

 1.) Go To the root directory and run your package manager with the "start" command (e.g npm start)\
 
 
  ## HOW TO USE THE APP
  1.) Upon initial visit, you are able to see the app's homepage and browse and view courses and subjects, but to view media,you must sign up first. You can sign with your email,or with google or facebook\
  2.) Once signed in you have access to purchase courses, through one of three payment channels. Orange Pay, Mtn Pay and MaPayCard, (simply follow the payment instructions).\
  3.) After purchasing a course, you have access to download it as well as view it.Please be patient while the course downloads,you will get a notification upon complete download\
  4.)  You can view all content you downloaded offline, do not refresh your browser while offline as you will lose access to the site as a new request is made and your browser defaults to an "offline" screen.\
  
  
  
  ## BUGS NOTED
  1.) on IOS devices, when a video is opened, it does not enter into full screen mode like on other devices. Similarly, when it is closed from fullscren mode. the video reverts to a modal, and doesn't close down completely.\

  

 
  ## OTHER THINGS OF NOTE 

 1.) Redux is used here for state management(store, provider,reducers and actions), which allows for scaling of this application. It is particularly helpful in keeping track of which audio file is currently playing, across courses\
 2.) Dexie JS is the library used for viewing media offline. Media can be downloaded up to 2GB, video compression is currently being worked on.\
 3.) Passwords are stored as hashes in the database and decrypted with Bcrypt library (as a way to protect our uses information from being compromised\
 4.) PDF's are always opened in a new page, may not conform with all browsers(the one's who prevent pop ups).\
 5.) Courses and chapters cannot be added in this module. The module for adding courses and setting prices is a separate codebase entirely.


 
 
 ## Database Structure -
 
  users = {\
        uid:{type:string,required:true},\
        fullName:{type: string ,required:true},\
        email:{type: string ,required:true, unique:true},\
        password:{type: string ,required:true},\
        classOption:{type: string ,required:true,}\
        imageUrl:{type: string ,required:false}\
        pvExamen:{type: string ,required:false}\
        registeredOn:{type: Date Object ,required:true}\
        schoolOrigin:{type: string ,required:false}\
        facebook:{type: string ,required:false}\
        affiliate:{type: string ,required:false}\
        lessonsWatched:{type: array of strings ,required:true}\
       coursesPurchased:{type: array of Objects ,required:true}\
        
   }


     teachers = {\
        uid:{type:string,required:true},\
        firstName:{type: string ,required:true},\
         lasName:{type: string ,required:true},\
        imageUrl:{type: string ,required:false}\
        level:{type: string ,required:true}\
        subject:{type: string ,required:true}\
        bio:{type: string ,required:true}\
     
   }

   categories = {\

    title:{type:string,required:true},\
     uid:{type:string,required:true},\
     subLevels:{type:array of strings,required:true},\

   }

(sections serve as the subjects under each category(above) )\
   sections = {\

     body:{type: string ,required:true}\
     category:{type: string ,required:true}\
     categoryId:{type: string ,required:true}\
     instructor:{type: string ,required:true}\
     price:{type:string ,required:true}\
     subjectImageUrl:{type: string ,required:true}\
     title:{type: string ,required:true}\
     uid:{type:string,required:true},
     subLevel:{type:string,required:false},
   }

   
(each chapter belongs to a particular section(above) )\

   chapters = {\

     body:{type: string ,required:true}\
     category:{type: string ,required:true}\
     chapterNumber:{type: string ,required:true}\
     sectionId:{type: string ,required:true}\
     chapterPdfUrl:{type: string ,required:true}\
     title:{type: string ,required:true}\
     uid:{type:string,required:true},
     subject:{type:string,required:true},
   }


(boneCourses serves as the courses under each chapter(above) )\

boneCourses = {\

     body:{type: string ,required:true}\
     category:{type: string ,required:true}\
     chapterId:{type: string ,required:true}\
     duration:{type: string ,required:true}\
     lessonUrl:{type: string ,required:true}\
     lessonNumber:{type: string ,required:true}\
     title:{type: string ,required:true}\
     uid:{type:string,required:true},
     section:{type:string,required:true},

}
   

   


   
   

   
