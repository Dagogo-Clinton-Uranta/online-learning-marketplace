import { db } from "../../config/firebase";
import { fetchJobs, fetchSingleJob } from "../reducers/job.slice";


export const getJobs = (uid) => async (dispatch) => {
    db.collection('Jobs').get().then((snapshot) => {
        const jobs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        // console.log('Jobs: ', jobs);
        dispatch(fetchJobs(jobs));
}).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching jobs', errorMessage);
});

};

export const getSingleJob = (id) => async (dispatch) => {
    var job = db.collection("Jobs").doc(id);

    job.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        dispatch(fetchSingleJob(doc.data()));
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

};

export const addJob = (job, setLoading, clearState) => async (dispatch) => {
    db.collection("Jobs").add({
        title: job.title,
        description: job.description,
        location: job.location,
        rate: job.rate
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        clearState();
        setLoading(false);
        alert('Job has been added.✔');
        
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert('Error adding job.❌')
    });

};
export const updateJob = (job, setLoading, clearState, history) => async (dispatch) => {

    var jobRef = db.collection("Jobs").doc(job.id);
    const jobData = jobRef.update({
        title: job.title,
        description: job.description,
        location: job.location,
        rate: job.rate
    })
    .then(() => {
        setLoading(false);
        alert('Job has been updated.✔');
        history.push('/company/jobs');
        
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
        // alert('Error updating job.❌')
        setLoading(false);
    });

};