<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// 'today', 'weekly', 'monthly', 'yearly'

class AttendanceController extends Controller
{
    private $monthList = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    public function index(Request $request)
    {
        $per_page = $request->get('per_page') ? $request->get('per_page') : 1000;
        $time = $request->get('time') ? strtolower($request->get('time')) : 'today';
        $date = $request->get('date') ? Carbon::createFromDate($request->get('date')) : Carbon::now();

        $attendances = Attendance::query();
        $role = Auth::user()->roles->first();

        if ($time == 'today') {
            $attendances->whereDate('created_at', Carbon::today());
        } else if ($time == 'weekly') {
            $startOfWeek = Carbon::now()->startOfWeek();
            $endOfWeek = Carbon::now()->endOfWeek();

            $attendances->whereBetween('created_at', [$startOfWeek, $endOfWeek]);
        } else if ($time == 'monthly') {
            $monthName = $request->get('month')
                ? array_search(strtoupper($request->get('month')), $this->monthList)
                : Carbon::now()->format('F');

            $attendances
                ->whereMonth('created_at', $monthName + 1)
                ->whereYear('created_at', date('Y'));
        }

        if ($role->title != 'Super Admin')
            $attendances->where('user_id', Auth::user()->id);
        else
            $attendances->with(['user']);

        return response()->json(
            $attendances
                ->orderBy('created_at', 'DESC')
                ->paginate($per_page),
            200
        );
    }

    public function create()
    {
        $user_id = Auth::user()->id;
        $attendance = Attendance::whereDate('created_at', Carbon::today())
            ->where('user_id', $user_id)
            ->first();

        if ($attendance && !$attendance->created_at->isToday()) {
            $attendance = new Attendance();
            $attendance->checkin = now();
            $attendance->user_id = $user_id;
        }

        if (!$attendance) {
            $attendance = new Attendance();
            $attendance->checkin = now();
            $attendance->user_id = $user_id;
        } else {
            $attendance->checkout = now();
        }

        $attendance->save();

        return response()->json([
            'status' => 'Success',
            'data' => $attendance
        ], 200);
    }

    public function todayAttendance()
    {
        return response()->json([
            'status' => 'Success',
            'data' => Attendance::whereDate('created_at', Carbon::today())
                ->where('user_id', Auth::user()->id)
                ->first()
        ]);
    }

    public function myAttendance()
    {
        return response()->json([
            'status' => 'Success',
            'data' => Attendance::where('user_id', Auth::user()->id)
                ->get()
        ]);
    }
}
