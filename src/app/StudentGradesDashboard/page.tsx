/**
 * @summary 生徒成績ダッシュボードページ
 */

import { StudentGrade, StudentGradesDashboard } from '@/components/StudentGradesDashboard'

const gradeData: StudentGrade[] = [
	{
		studentId: '001',
		studentName: '田中太郎',
		grade: '1年',
		grades: [
			{ subject: '数学', score: 85 },
			{ subject: '英語', score: 72 },
			{ subject: '国語', score: 90 },
		],
	},
	{
		studentId: '002',
		studentName: '佐藤花子',
		grade: '2年',
		grades: [
			{ subject: '数学', score: 45 },
			{ subject: '英語', score: 88 },
			{ subject: '国語', score: 76 },
		],
	},
	{
		studentId: '003',
		studentName: '鈴木一郎',
		grade: '1年',
		grades: [
			{ subject: '数学', score: 92 },
			{ subject: '英語', score: 65 },
			{ subject: '国語', score: 55 },
		],
	},
	{
		studentId: '004',
		studentName: '高橋美咲',
		grade: '3年',
		grades: [
			{ subject: '数学', score: 78 },
			{ subject: '英語', score: 82 },
			{ subject: '国語', score: 88 },
		],
	},
	{
		studentId: '005',
		studentName: '伊藤健太',
		grade: '2年',
		grades: [
			{ subject: '数学', score: 55 },
			{ subject: '英語', score: 48 },
			{ subject: '国語', score: 62 },
		],
	},
]

export default function Page() {
	return <StudentGradesDashboard initialData={gradeData} />
}
