/**
 * @summary 出席管理ダッシュボードページ
 */

import { AttendanceDashboard, AttendanceRecord } from '@/components/AttendanceDashboard'

const attendanceData: AttendanceRecord[] = [
	{ studentId: '001', studentName: '田中太郎', totalClasses: 100, attendedClasses: 95, grade: '1年' },
	{ studentId: '002', studentName: '佐藤花子', totalClasses: 100, attendedClasses: 78, grade: '2年' },
	{ studentId: '003', studentName: '鈴木一郎', totalClasses: 100, attendedClasses: 62, grade: '1年' },
	{ studentId: '004', studentName: '高橋美咲', totalClasses: 100, attendedClasses: 88, grade: '3年' },
	{ studentId: '005', studentName: '伊藤健太', totalClasses: 100, attendedClasses: 45, grade: '2年' },
	{ studentId: '006', studentName: '渡辺由美', totalClasses: 100, attendedClasses: 92, grade: '1年' },
]

export default function Page() {
	return <AttendanceDashboard initialData={attendanceData} />
}
