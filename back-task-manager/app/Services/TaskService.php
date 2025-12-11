<?php

namespace App\Services;

use manager\app\Http\Requests\TaskRequest;
use manager\app\Models\Task;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class TaskService
{
    public function getUserTasks(Request $request): Collection
    {
        return $request->user()->tasks()->get();
    }

    public function createTask(TaskRequest $request): Task
    {
        return $request->user()->tasks()->create($request->validated());
    }

    public function getTask(Task $task): Task
    {
        return $task;
    }

    public function updateTask(TaskRequest $request, Task $task): Task
    {
        $task->update($request->validated());

        return $task->fresh();
    }

    public function deleteTask(Task $task): bool
    {
        return $task->delete();
    }
}
