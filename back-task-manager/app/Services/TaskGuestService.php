<?php

namespace App\Services;

use manager\app\Constants\HttpStatuses;
use manager\app\Http\Requests\TaskRequest;
use manager\app\Models\Task;
use manager\app\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;


class TaskGuestService
{
    public function getGuestTasks(Request $request): Collection
    {
        $user = $this->getUserByGuestId($request->input('guest_id'));

        return $user->tasks()->get();
    }

    public function createTask(TaskRequest $request): Task
    {
        $user = $this->getUserByGuestId($request->input('guest_id'));

        return $user->tasks()->create($request->validated());
    }

    public function getTask(TaskRequest $request, Task $task): Task
    {
        $user = $this->getUserByGuestId($request->input('guest_id'));

        return $this->findGuestTaskOrFail($user, $task->id);
    }

    public function updateTask(TaskRequest $request, Task $task): Task
    {
        $user = $this->getUserByGuestId($request->input('guest_id'));
        $task = $this->findGuestTaskOrFail($user, $task->id);
        $task->update($request->validated());

        return $task->fresh();
    }

    public function deleteTask(Request $request, Task $task): bool
    {
        $user = $this->getUserByGuestId($request->input('guest_id'));
        $task = $this->findGuestTaskOrFail($user, $task->id);

        return $task->delete();
    }

    private function getUserByGuestId(?string $guestId): User
    {
        if (!$guestId) {
            abort(422, 'Guest ID is required');
        }

        $user = User::where('guest_id', $guestId)->first();

        if (!$user) {
            abort(HttpStatuses::HTTP_NOT_FOUND, 'User not found');
        }

        return $user;
    }


    private function findGuestTaskOrFail(User $user, int $taskId): Task
    {
        $task = $user->tasks()->find($taskId);

        if (!$task) {
            abort(HttpStatuses::HTTP_NOT_FOUND, 'Task not found');
        }

        return $task;
    }
}
