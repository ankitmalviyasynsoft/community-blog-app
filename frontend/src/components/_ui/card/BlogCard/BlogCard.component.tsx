import React, { useEffect, useState } from 'react'
import { Box, Card, Chip, Stack, Typography } from '@mui/material'
import { BlogCardProps } from './BlogCard.type'
import { MdArrowOutward } from "react-icons/md";
import { useRouter } from 'next/router';
import { convertHtmlToText } from '@/utils';
import { styled } from './BlogCard.style'
import moment from 'moment';
import Image from 'next/image';
import ImageNotFound from '../../imageNotFound/ImageNotFound.component';
import Link from 'next/link';
import ChipCard from '../chip/ChipCard.component';


export default function BlogCard(props: BlogCardProps) {
  const { style, data, isContent, isCategory } = props
  const router = useRouter()
  const [content, setContent] = useState('')

  useEffect(() => {
    let content = convertHtmlToText(data?.content as string)
    setContent(content)
  }, [])


  return (
    <Card>
      <Stack spacing={1} direction={{ xs: 'column', sm: style.direction, md: style.direction }}>

        <Stack className='cursor-pointer' >
          {/* height={{ xs: 248, md: style.imageHeight || 1 }} width={{ xs: 1, md: style.imageWidth || 1 }} */}
          <Stack sx={styled.thumbnailBox} height={{ xs: 248, sm: style.imageHeight, md: style.imageHeight || 1 }} width={{ xs: 1, md: style.imageWidth || 1 }} onClick={() => router.push(`/blog/detail/${data?._id}`)}>
            {data?.profileURL ? <Image src={data?.profileURL || ''} alt='post' width={500} height={500} /> : <ImageNotFound />}
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography variant='body3' fontWeight={600}>• {moment(data?.createdAt).format('DD MMM YYYY')}</Typography>

          <Stack width={1} direction='row' justifyContent='space-between' className='cursor-pointer' onClick={() => router.push(`/blog/detail/${data?._id}`)}>
            <Typography variant='h3' className='line-1'>{data?.title}</Typography>
            <Stack>
              <MdArrowOutward size='1rem' />
            </Stack>
          </Stack>

          {
            isContent && <Stack >
              <Typography variant='body1' className='line-2'>{content}</Typography>
            </Stack>
          }

          {isCategory && <Stack direction='row' gap={1} flexWrap='wrap'>
            {data?.categories?.length && data?.categories.map((item) =>
              <ChipCard categoryData={item} key={item._id} />
            )}
          </Stack>}
        </Stack>
      </Stack>
    </Card >
  )
}
