#!/bin/bash

echo "🚀 Setting up WorkflowIQ - AI-Powered Business Process Intelligence Platform"
echo "=================================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
        
        # Check if version is >= 18
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | cut -d'v' -f2)
        if [ "$MAJOR_VERSION" -lt 18 ]; then
            print_error "Node.js version 18+ is required. Please upgrade."
            exit 1
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
}

# Check if Python is installed
check_python() {
    if command -v python3 &> /dev/null; then
        PYTHON_VERSION=$(python3 --version)
        print_success "Python is installed: $PYTHON_VERSION"
    else
        print_error "Python 3 is not installed. Please install Python 3.8+ first."
        exit 1
    fi
}

# Check if Docker is installed
check_docker() {
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version)
        print_success "Docker is installed: $DOCKER_VERSION"
    else
        print_warning "Docker is not installed. Some features may not work."
        print_status "You can install Docker from: https://docs.docker.com/get-docker/"
    fi
}

# Install root dependencies
install_root_deps() {
    print_status "Installing root dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        print_success "Root dependencies installed successfully"
    else
        print_error "Failed to install root dependencies"
        exit 1
    fi
}

# Install shared package dependencies
install_shared_deps() {
    print_status "Installing shared package dependencies..."
    cd shared && npm install && cd ..
    if [ $? -eq 0 ]; then
        print_success "Shared package dependencies installed successfully"
    else
        print_error "Failed to install shared package dependencies"
        exit 1
    fi
}

# Install backend dependencies
install_backend_deps() {
    print_status "Installing backend dependencies..."
    cd backend && npm install && cd ..
    if [ $? -eq 0 ]; then
        print_success "Backend dependencies installed successfully"
    else
        print_error "Failed to install backend dependencies"
        exit 1
    fi
}

# Install frontend dependencies
install_frontend_deps() {
    print_status "Installing frontend dependencies..."
    cd frontend && npm install && cd ..
    if [ $? -eq 0 ]; then
        print_success "Frontend dependencies installed successfully"
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
}

# Install AI services dependencies
install_ai_deps() {
    print_status "Installing AI services dependencies..."
    cd ai-services
    if command -v python3 &> /dev/null; then
        python3 -m pip install -r requirements.txt
        if [ $? -eq 0 ]; then
            print_success "AI services dependencies installed successfully"
        else
            print_error "Failed to install AI services dependencies"
        fi
    else
        print_warning "Python 3 not found. Skipping AI services dependencies."
    fi
    cd ..
}

# Build shared package
build_shared() {
    print_status "Building shared package..."
    cd shared && npm run build && cd ..
    if [ $? -eq 0 ]; then
        print_success "Shared package built successfully"
    else
        print_error "Failed to build shared package"
        exit 1
    fi
}

# Setup environment files
setup_env() {
    print_status "Setting up environment files..."
    
    # Root .env
    if [ ! -f .env ]; then
        cp env.example .env
        print_success "Created .env file from template"
    else
        print_warning ".env file already exists"
    fi
    
    # Backend .env
    if [ ! -f backend/.env ]; then
        cp backend/.env.example backend/.env 2>/dev/null || echo "# Backend Environment Variables" > backend/.env
        print_success "Created backend/.env file"
    else
        print_warning "backend/.env file already exists"
    fi
    
    # Frontend .env.local
    if [ ! -f frontend/.env.local ]; then
        cat > frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
NEXT_PUBLIC_AI_API_URL=http://localhost:8001
EOF
        print_success "Created frontend/.env.local file"
    else
        print_warning "frontend/.env.local file already exists"
    fi
}

# Main setup function
main() {
    echo ""
    print_status "Starting WorkflowIQ setup process..."
    echo ""
    
    # Check prerequisites
    check_node
    check_python
    check_docker
    
    echo ""
    print_status "Installing dependencies..."
    
    # Install dependencies
    install_root_deps
    install_shared_deps
    build_shared
    install_backend_deps
    install_frontend_deps
    install_ai_deps
    
    echo ""
    print_status "Setting up environment..."
    setup_env
    
    echo ""
    print_success "🎉 WorkflowIQ setup completed successfully!"
    echo ""
    print_status "Next steps:"
    echo "  1. Update your .env files with your API keys and configuration"
    echo "  2. Start the development environment:"
    echo "     npm run docker:dev    # Start with Docker (recommended)"
    echo "     npm run dev          # Or start services individually"
    echo ""
    print_status "Documentation:"
    echo "  • API Docs: http://localhost:8000/api-docs"
    echo "  • Frontend: http://localhost:3000"
    echo "  • AI Services: http://localhost:8001/docs"
    echo ""
    print_status "Happy coding! 🚀"
}

# Run main function
main 