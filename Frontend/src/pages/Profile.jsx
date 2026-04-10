import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, Typography, Avatar, Box, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export default function Profile() {
  const username = localStorage.getItem('username') || 'User';
  const role = localStorage.getItem('role') || 'Member';

  return (
    <Layout>
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', bgcolor: 'primary.main', mb: 2 }}>
              <PersonIcon sx={{ fontSize: 50 }} />
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              {username}
            </Typography>
            <Typography color="text.secondary" sx={{ textTransform: 'capitalize', mb: 3 }}>
              {role}
            </Typography>
            <Divider />
            <Box sx={{ mt: 3, textAlign: 'left' }}>
              <Typography variant="body2" color="text.secondary">
                Status Akun: <b>Aktif</b>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Akses Sistem: <b>{role === 'pemilik' || role === 'admin' ? 'Penuh' : 'Terbatas'}</b>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
}
