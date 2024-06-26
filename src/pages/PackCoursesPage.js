import { Container, Grid, TextField, Typography, TextareaAutosize, Button, Paper, Divider, Box } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import math from 'src/assets/images/math.jpeg';
import MathCover from 'src/assets/images/mathcover.jpeg';
import library from 'src/assets/images/library.jpeg';
import DNA from 'src/assets/images/DNA.jpeg';
import chem from 'src/assets/images/chembeak.jpeg';
import chem2 from 'src/assets/images/chem2.jpeg';
import biology from 'src/assets/images/biology.jpeg';
import english from 'src/assets/images/english.jpeg';
import philosophy from 'src/assets/images/philoslib.jpeg';

import a1 from 'src/assets/images/1.jpeg';
import a2 from 'src/assets/images/2.jpeg';
import a3 from 'src/assets/images/3.jpeg';
import a4 from 'src/assets/images/4.jpeg';
import a5 from 'src/assets/images/5.jpeg';
import a6 from 'src/assets/images/6.jpeg';
import a7 from 'src/assets/images/7.jpeg';
import a8 from 'src/assets/images/8.png';
import a9 from 'src/assets/images/9.jpeg';
import a10 from 'src/assets/images/10.jpeg';

import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';

import { fetchCurrentSubject } from 'src/redux/actions/main.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import SmallerCardPage from './SmallerCardPage';
import SampleCardPage from './SampleCardPage';
import { fetchCategorySubjects } from 'src/redux/actions/main.action';
import { PackCourses } from 'src/utils/packs-data';

function PackCoursesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chosen, setChosen] = useState('');
  const location = useLocation();
  const { packData, courses } = location.state;

  const { categorySubjects, allCategories } = useSelector((state) => state.main);

  const { user, error } = useSelector((state) => state.auth);
  //console.log('error is', error);

  const [topics, setTopics] = useState(categorySubjects);
  //console.log('category subs are ', categorySubjects);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    setTopics(categorySubjects);
    setChosen(
      categorySubjects && categorySubjects[0] && categorySubjects[0].category ? categorySubjects[0].category : ' '
    );
  }, [categorySubjects]);

  const oldTopics = [
    {
      title: 'Chemie 10e Annee ',
      author: 'Sidiki Keita',
      price: '22,000',
      lessons: 14,
      time: '2H 26 MINS',
      image: chem,
    },
    {
      title: 'Anglais 10e Annee ',
      author: 'Kabinet Keita',
      price: '29,000',
      lessons: 15,
      time: '4H 26 MINS',
      image: english,
    },
    {
      title: 'Biologie 10e Annee ',
      author: 'Elhadj Keita',
      price: '28,000',
      lessons: 16,
      time: '5H 26 MINS',
      image: biology,
    },
    {
      title: 'Philosophie 10e Annee',
      author: 'Sidiki Keita',
      price: '30,000',
      lessons: 15,
      time: '5H 16 MINS',
      image: philosophy,
    },
    {
      title: 'Mathematiques 10e Annee',
      author: 'Fode Keita',
      price: '28,000',
      lessons: 14,
      time: '4H 11 MINS',
      image: math,
    },
    {
      title: 'Chemie 10e Annee',
      author: 'Sidiki Keita',
      price: '29,000',
      lessons: 13,
      time: '3H 26 MINS',
      image: chem,
    },
    { image: chem2 },
    { image: DNA },
    { image: MathCover },
    { image: library },
    { image: a1 },
    { image: a2 },
    { image: a3 },
    { image: a4 },
    { image: a5 },
    { image: a6 },
    { image: a7 },
    { image: a8 },
    { image: a9 },
    { image: a10 },
  ];

  const populateCategory = (category) => {
    dispatch(fetchCategorySubjects(category));
    //console.log(`NOW REDIRECTING to ${category}!!!`);

    setTimeout(() => {
      navigate('/dashboard/6e');
    }, 1000);
  };

  //console.log('PACK___DATA', location.state);

  return (
    <>
      <Container maxWidth="xs" sx={{ backgroundColor: 'white', border: '1px solid lightgray' }}>
        <Grid container spacing={2}>
          <Grid
            container
            item
            xs={12}
            spacing={1}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
          >
            {topics.slice(0, 1).map((topic, i) => (
              <Grid
                item
                xs={11}
                onClick={() => {
                  dispatch(fetchCurrentSubject(topic));
                }}
                style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
              >
                <SampleCardPage
                  uid={packData?.uid}
                  title={packData?.title}
                  image={packData?.image}
                  author={packData?.author}
                  price={packData.price}
                  lessons={7}
                  time={'2H 26 MINS'}
                />
              </Grid>
            ))}
          </Grid>

          <Grid
            container
            item
            xs={12}
            spacing={3}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
          >
            {PackCourses.filter((course) => courses.includes(course.categoryId)).map((topic, i) => (
              <Grid
                item
                xs={6}
                onClick={() => {
                  dispatch(fetchCurrentSubject(topic));
                }}
                style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: '20px' }}
              >
                <SmallerCardPage
                  uid={topic.uid}
                  title={topic.title}
                  image={
                    topic && topic.subjectImageUrl && topic.subjectImageUrl.length > 1
                      ? topic.subjectImageUrl
                      : oldTopics[i] && oldTopics[i].image
                      ? oldTopics[i].image
                      : a10
                  }
                  author={topic.instructor}
                  price={'22,000'}
                  lessons={5}
                  time={'2H 26 MINS'}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default PackCoursesPage;
