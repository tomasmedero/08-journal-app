import {
  SaveOutlined,
  UploadOutlined,
  DeleteOutline,
} from '@mui/icons-material'
import { Button, Grid, TextField, Typography, IconButton } from '@mui/material'
import { ImgGallery } from '../components/ImgGallery'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { useEffect } from 'react'
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from '../../store/journal'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useRef } from 'react'

export const NoteView = () => {
  const dispatch = useDispatch()
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal)

  const { body, title, date, onInputChange, formState } = useForm(note)

  const dateString = useMemo(() => {
    const newDate = new Date(date)

    return newDate.toUTCString()
  }, [date])

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])

  const fileInputRef = useRef()

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return

    dispatch(startUploadingFiles(target.files))
  }

  const onDelete = () => {
    dispatch(startDeletingNote())
  }

  return (
    <>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        sx={{ mb: 1 }}
      >
        <Grid item>
          <Typography fontSize={39} fontWeight='light'>
            {dateString}
          </Typography>
        </Grid>

        <Grid item>
          <input
            type='file'
            multiple
            ref={fileInputRef}
            onChange={onFileInputChange}
            style={{ display: 'none' }}
          />
          <IconButton
            color='primary'
            disabled={isSaving}
            onClick={() => fileInputRef.current.click()}
          >
            <UploadOutlined />
          </IconButton>
          <Button
            color='primary'
            sx={{ padding: 2 }}
            onClick={onSaveNote}
            disabled={isSaving}
          >
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Guardar
          </Button>
        </Grid>

        <Grid container>
          <TextField
            type='text'
            variant='filled'
            fullWidth
            placeholder='Ingrese titulo'
            label='Titulo'
            sx={{ border: 'none', mb: 1 }}
            name='title'
            value={title}
            onChange={onInputChange}
          />

          <TextField
            type='text'
            variant='filled'
            fullWidth
            multiline
            placeholder='Que sucedio el dia de hoy?'
            minRows={5}
            name='body'
            value={body}
            onChange={onInputChange}
          />
        </Grid>

        <Grid container justifyContent='end'>
          <Button onClick={onDelete} sx={{ mt: 2 }} color='error'>
            <DeleteOutline />
            Borrar
          </Button>
        </Grid>

        <ImgGallery images={note.imageUrls} />
      </Grid>
    </>
  )
}
