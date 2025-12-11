<?php

namespace App\Http\Controllers;

use manager\app\Constants\HttpStatuses;
use manager\app\Http\Requests\TaskRequest;
use manager\app\Http\Resources\TaskResource;
use manager\app\Models\Task;
use manager\app\Services\TaskService;
use backuse Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class TaskController extends Controller
{
    private TaskService $taskService;

    public function __construct(TaskService $taskService){
        $this->taskService = $taskService;
    }

    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Task::class);
        $tasks = $this->taskService->getUserTasks($request);

        return response(TaskResource::collection($tasks), HttpStatuses::HTTP_OK);
    }

    public function store(TaskRequest $request): Response
    {
        Gate::authorize('create', Task::class);
        $task = $this->taskService->createTask($request);

        return response(new TaskResource($task), HttpStatuses::HTTP_CREATED);
    }

    public function show(Task $task): Response
    {
        Gate::authorize('view', $task);
        $task = $this->taskService->getTask($task);

        return response(new TaskResource($task), HttpStatuses::HTTP_OK);
    }

    public function update(TaskRequest $request, Task $task): Response
    {
        Gate::authorize('update', $task);
        $task = $this->taskService->updateTask($request, $task);

        return response(new TaskResource($task), HttpStatuses::HTTP_OK);
    }

    public function destroy(Task $task): Response
    {
        Gate::authorize('delete', $task);
        $this->taskService->deleteTask($task);

        return response()->json(null, HttpStatuses::HTTP_NO_CONTENT);
    }
}
