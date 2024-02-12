import BlogCard from '@/components/_ui/card/BlogCard/BlogCard.component'
import { Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { RelevantBlogProps } from './RecentlyBlog.type'



export default function RecentlyBlogTopThree({ initialData }: RelevantBlogProps) {

  return (
    <Stack className='section-padding'>
      <Typography variant='h4' fontWeight={600} className='heading-padding-bottom'>Recently Blog</Typography>

      <Grid container spacing={4}>

        <Grid item xs={12} sm={12} md={6}>
          <BlogCard style={{ direction: 'column', imageHeight: 248 }} data={initialData.posts[0]} />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Stack spacing={4}>
            <BlogCard style={{ direction: 'row', imageHeight: 200, imageWidth: 200 }} data={initialData.posts[1]} />
            <BlogCard style={{ direction: 'row', imageHeight: 200, imageWidth: 200 }} data={initialData.posts[2]} />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}