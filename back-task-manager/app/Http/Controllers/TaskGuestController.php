<?php

namespace App\Http\Controllers;

use manager\app\Constants\HttpStatuses;
use manager\app\Http\Requests\TaskRequest;
use manager\app\Http\Resources\TaskResource;
use manager\app\Models\Task;
use manager\app\Services\TaskGuestService;
use backuse Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TaskGuestController extends Controller
{
    private TaskGuestService $taskGuestService;

    public function __construct(TaskGuestService $taskGuestService){
        $this->taskGuestService = $taskGuestService;
    }

    public function index(Request $request): Response
    {
        $tasks = $this->taskGuestService->getGuestTasks($request);

        return response(TaskResource::collection($tasks), HttpStatuses::HTTP_OK);
    }

    public function store(TaskRequest $request): Response
    {
        $task = $this->taskGuestService->createTask($request);

        return response(new TaskResource($task), HttpStatuses::HTTP_CREATED);
    }

    public function show(TaskRequest $request, Task $task): Response
    {
        $task = $this->taskGuestService->getTask($request, $task);

        return response(new TaskResource($task), HttpStatuses::HTTP_OK);
    }

    public function update(TaskRequest $request, Task $task): Response
    {
        $task = $this->taskGuestService->updateTask($request, $task);

        return response(new TaskResource($task), HttpStatuses::HTTP_OK);
    }

    public function destroy(Request $request, Task $task): JsonResponse
    {
        $this->taskGuestService->deleteTask($request, $task);

        return response()->json(null, HttpStatuses::HTTP_NO_CONTENT);
    }
}
