import PageHeader from '@/components/_ui/pageHeader/PageHeader.components'
import { useGetAllCategoriesQuery } from '@/redux/api/category.api'
import { Page } from '@/types/Page.type'
import { Box, Button, Container, Pagination, PaginationItem, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import React from 'react'
import { useColumns } from './hooks/categories.hook'



const Categories: Page = () => {
  const router = useRouter()
  const { columns } = useColumns()
  const paginationModel = { page: Number(router.query.page || 1) - 1, pageSize: 5 }
  const { data, isSuccess, isError, isFetching, isUninitialized } = useGetAllCategoriesQuery('')


  const setPaginationModel = (page: number) => {
    router.push({ query: { page } }, undefined, { shallow: true })
  }

  // useEffect(() => {
  //   getTradesByUserId({ userId: profile._id, page: (paginationModel.page + 1), size: paginationModel.pageSize })
  // }, [paginationModel.page])


  const handleDblClick = (row: any) => {
    router.push(`/`)
  }


  return (
    <Container>
      <Stack className='section-padding'>
        <PageHeader heading='All Categories' isButton buttonText='Add Category' callBack={() => router.push('/')} />

        <Stack>
          {/* === Table === */}
          <DataGrid
            rows={data?.map((item: any) => ({ id: item._id, ...item })) || []}
            columns={columns}
            rowCount={data?.length || 0}
            loading={isUninitialized || isFetching}
            paginationModel={paginationModel}
            onRowDoubleClick={({ row }) => handleDblClick(row)}
            slots={{
              pagination: () => (
                <Pagination
                  page={paginationModel.page + 1}
                  onChange={(_, newPage) => setPaginationModel(newPage)}
                  count={1000 ? Math.ceil(Number(1000) / paginationModel.pageSize) : 0}
                  renderItem={(item) => <PaginationItem slots={{ previous: () => 'Prev', next: () => 'Next' }} {...item} />}
                />
              ),
              noRowsOverlay: () => <Typography variant='body2' color='text.secondary' className='center' height={1}>No Category found</Typography>
            }}
          />
        </Stack>
      </Stack>
    </Container>
  )
}

Categories.layoutProps = {
  title: 'Categories',
  pageTypes: 'protected',
  isProtectedPage: true
}

export default Categories
