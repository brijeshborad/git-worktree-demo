// src/app/test-two/page.tsx
export default function TestTwo() {
    // const tasks = ['Task 1: Review code', 'Task 2: Deploy app', 'Task 3: Test features'];
    const tasks = ['Task 1: Review code', 'Task 2: Deploy app', 'Task 3: Test features', 'Task 4: Demo to client'];
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
            <h1 className="text-3xl font-bold mb-4">Test Two: Task List Module</h1>
            <ul className="list-disc space-y-2">
                {tasks.map((task, index) => (
                    <li key={index} className="text-lg">{task}</li>
                ))}
            </ul>
        </div>
    );
}