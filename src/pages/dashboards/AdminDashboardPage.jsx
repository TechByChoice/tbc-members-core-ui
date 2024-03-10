import React, { useEffect, useState } from 'react';
import { routes } from '@/lib/routes';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent } from '@mui/material';

export default function AdminDashboard() {
    const [ stats, setStats ] = useState();

    useEffect(() => {
        fetch(routes.api.users.getAdmin(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setStats(data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    const renderPieChart = (data, title) => (
        <>
            <Typography variant="h6" style={{ marginTop: 20 }}>
                {title}
            </Typography>
            <PieChart
                series={[{ data: data.map((item, index) => ({ id: index, value: item.members_count || item.tech_journey, label: item.name })) }]}
                height={400}
            />
        </>
    );
    const numberCard = (data, title) => (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h6" style={{ marginTop: 20 }}>
                        {title}
                    </Typography>
                    {data}
                </CardContent>
            </Card>
        </>
    );

    return (
        <>
            <div>Partnerships</div>
            <div>
                <Typography variant="h5">Org Stats</Typography>
                {stats && (
                    <div>
                        {stats.total_active_mentors > 0 && numberCard(stats.total_active_mentors, 'Active Mentors')}
                        {stats.total_company_talent_choice > 0 && numberCard(stats.total_company_talent_choice, 'Paying Companies')}
                        {stats.total_member > 0 && numberCard(stats.total_member, 'Total Members')}
                        {stats.total_member_talent_choice > 0 && numberCard(stats.total_member_talent_choice, 'Members Seeking Work')}
                        {stats.total_mentors_applications > 0 && numberCard(stats.total_mentors_applications, 'Total Mentor Applications')}
                        {stats.total_mentors_interviewing > 0 && numberCard(stats.total_mentors_interviewing, 'Mentors Interviewing')}
                        {stats.total_mentors_need_cal_info > 0 && numberCard(stats.total_mentors_need_cal_info, 'Mentors Need Calendar Info')}
                        {stats.total_member_level.length > 0 && renderPieChart(stats.total_member_level, 'Years of Experiences')}
                        {stats.identity_sexuality.length > 0 && renderPieChart(stats.identity_sexuality, 'Members Sexuality Breakdown')}
                        {stats.identity_gender.length > 0 && renderPieChart(stats.identity_gender, 'Members Gender Breakdown')}
                        {stats.identity_pronouns.length > 0 && renderPieChart(stats.identity_pronouns, 'Members Pronouns Breakdown')}
                        {stats.skills && stats.skills.length > 0 && renderPieChart(stats.skills, 'Skills')}
                        {stats.departments && stats.departments.length > 0 && renderPieChart(stats.departments, 'Departments')}
                        {stats.roles && stats.roles.length > 0 && renderPieChart(stats.roles, 'Roles')}
                        {stats.industries && stats.industries.length > 0 && renderPieChart(stats.industries, 'Industries')}
                    </div>
                )}
            </div>
        </>
    );
}
