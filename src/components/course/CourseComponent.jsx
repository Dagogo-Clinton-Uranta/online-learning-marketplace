import React, { useState } from 'react';
import chem from 'src/assets/images/chembeak.jpeg';
import profile from 'src/assets/images/profile.jpeg'
import { useDispatch, useSelector } from 'react-redux';
import { Container,Grid, TextField, Button, Paper,Divider,Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoSwitch from '../../pages/LogoSwitch';
import VideoSwitch from '../../pages/VideoSwitch';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {AiOutlineDownload} from "react-icons/ai";
import Avatar from '@mui/material/Avatar';

const CourseComponent = () => {
const navigate = useNavigate();
const { subjectChapters,allChapterLessons,allQuizzesForSubject,presentSubject } = useSelector((state) => state.group);
const firstSplit = presentSubject.body.split('.')[1]
const secondSplit = firstSplit? firstSplit.split(':')[1]:""
const thirdSplit =  secondSplit? secondSplit.split(/[0-9]/):""
const [subjectList,setSubjectList] = useState(presentSubject && presentSubject.body && firstSplit && secondSplit && thirdSplit ?thirdSplit:[])

  return (
    <>
      <Grid
        container
        xs={12}
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),url(${chem})`,
          borderRadius: '0.5rem',
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            marginBottom: '1rem',
            color: 'white',
          }}
        >
          <h3 style={{ fontSize: '0.9rem' }}>{presentSubject.title}</h3>

          <p style={{ marginTop: '0.5rem' }}>{presentSubject && presentSubject.body.split('.')[0]}</p>

          <p style={{ marginTop: '2rem' }}>
            <p style={{ marginBottom: '1rem' }}>
              {presentSubject && presentSubject.body.split('.')[1] && presentSubject.body.split('.')[1].split(':')[0]}
            </p>
            <ol>
              {subjectList.length > 1 &&
                subjectList.slice(1, subjectList.length).map((item, index) => (
                  <li>
                    {index + 1}.{item}
                  </li>
                ))}
            </ol>
          </p>

          <p style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-start' }}>
            <Avatar alt="placeholder avatar" sx={{ width: 48, height: 48 }} src={profile} />

            <p>
              {presentSubject && presentSubject.instructor ? presentSubject.instructor : ' '}
              <br />
              {presentSubject.subLevel}
            </p>
          </p>
        </Grid>
      </Grid>

        <Grid
          item
          xs={12}
          md={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2rem',
            marginTop: '2rem',
            flexDirection: 'column',
            gap: '1rem',
            border: '1px solid lightgrey',
            width: '150%',
            padding: '1rem',
            borderRadius: '0.5rem',
          }}
        >
          <center>
            <b style={{ fontSize: '1.2rem' }}> 30,000 GNF</b> <s>50,000 GNF</s>
          </center>

          <p>Achat unique, accès à toutes les leçons</p>

          <Button
            variant="contained"
            style={{ backgroundColor: '#CC4436', color: '#FFFFFF', fontSize: '0.9rem', width: '100%', padding: '8px' }}
            // onClick={addToCartFxn}
          >
            Acheter maintenant
          </Button>
        </Grid>

      <Grid
        item
        xs={12}
        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: '1rem' }}
      >
        <center>
          <p
            style={{
              position: 'relative',
              display: 'block',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              borderBottom: '3px solid #CC4436',
              width: 'max-content',
            }}
          >
            Curriculum
          </p>
        </center>
      </Grid>

      <Grid container xs={12} style={{ paddingTop: '0rem' }}>
        <h2></h2>
        {subjectChapters && subjectChapters.length > 0 ? (
          subjectChapters
            .filter((item) => item)
            .slice(0, 1)
            .map((chapter, index) => (
              <>
                <Grid item xs={12} style={{ paddingTop: index == 0 ? '2rem' : '4rem', paddingBottom: '1rem' }}>
                  <p
                    style={{
                      position: 'relative',
                      marginLeft: '0.4rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      paddingBottom: '0.5rem',
                      borderBottom: '3px solid black',
                    }}
                  >
                    Chapitre 1: Acide et base en solution aqueuese
                    <PictureAsPdfIcon
                      style={{ fontSize: '2.2rem' }}
                    />
                  </p>
                </Grid>

                {allChapterLessons.filter((item) => item.chapterId === chapter.uid).length ? (
                  allChapterLessons
                    .filter((item) => item.chapterId === chapter.uid)
                    .sort((a, b) => (a.lessonNumber && b.lessonNumber ? a.lessonNumber - b.lessonNumber : 1))
                    .slice(0, 3)
                    .map((lesson, index) => (
                      <>
                        {lesson.duration !== 'quiz' ? (
                          <Grid
                            item
                            xs={12}
                            style={{
                              position: 'relative',
                              display: 'flex',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              gap: '1rem',
                              paddingTop: '0.8rem',
                              borderBottom: '1px solid lightgrey',
                            }}
                          >
                            <p style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                              {lesson.lessonUrl &&
                              lesson.lessonUrl.slice(lesson.lessonUrl.length - 3, lesson.lessonUrl.length) === 'mp4' ? (
                                <VideoSwitch uid={lesson.uid} audioFile={lesson.lessonUrl} />
                              ) : (
                                <LogoSwitch uid={lesson.uid} audioFile={lesson.lessonUrl} />
                              )}{' '}
                              &nbsp; {index + 1}.
                            </p>
                            <p style={{ display: 'inline' }}>
                              {' '}
                              {lesson.title &&
                                lesson.title.substring(0, 25) + `${lesson.title.length > 25 ? '...' : ''}`}
                            </p>
                            <p
                              style={{
                                position: 'absolute',
                                right: '1%',
                                display: 'flex',
                                gap: '15px',
                                alignItems: 'center',
                              }}
                            >
                              {lesson.duration}
                              <AiOutlineDownload
                                onClick={() => {

                                }}
                                style={{ fontSize: '1.5rem' }}
                              />
                            </p>
                          </Grid>
                        ) : (
                          <Grid item xs={12} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                            <p
                              style={{
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                paddingBottom: '0.5rem',
                                alignItems: 'center',
                                gap: '1rem',
                              }}
                            >
                              <span
                                // onClick={() => {
                                //   handleOpenPdf();
                                // }}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'flex-end',
                                  fontFamily: 'sans-serif',
                                  backgroundColor: 'red',
                                  color: 'white',
                                  fontSize: '1rem',
                                  width: '1.5rem',
                                  textAlign: 'center',
                                  borderRadius: '50%',
                                }}
                              >
                                Q
                              </span>
                              {lesson.title}
                            </p>
                            <Divider />
                          </Grid>
                        )}
                      </>
                    ))
                ) : (
                  <Grid
                    item
                    xs={12}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '1rem',
                      paddingTop: '0.8rem',
                      borderBottom: '1px solid lightgrey',
                    }}
                  >
                    <p style={{ display: 'inline' }}> No lessons for this chapter</p>
                  </Grid>
                )}
              </>
            ))
        ) : (
          <Grid item xs={12} style={{ paddingTop: '4rem', paddingBottom: '1rem' }}>
            <p
              style={{
                position: 'relative',
                marginLeft: '0.4rem',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                paddingBottom: '0.5rem',
                borderBottom: '3px solid black',
              }}
            >
              {'NO CHAPTERS AVAILABLE FOR THIS SUBJECT'}
            </p>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CourseComponent;
